import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SingleImagePost from "@/components/elements/singleImagePost";
import { PostDataInterface, PostResponseConfig } from "@/components/interfaces";
import { useTheme } from "@react-navigation/native";
import { style } from "@/style/global.css";
import { debounce } from "lodash";

export default function Feed() {
  const [postData, setPostData] = useState<PostDataInterface[]>([]);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [startFrom, setStartFrom] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const serverUrl = "https://minimal-blog-ivory.vercel.app/api/get_posts";
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    //setLoading(true); // Show loading state
    setRefreshing(true);
    setPostData([]); // Reset post data
    setStartFrom(0); // Reset pagination
    setHasMorePosts(true); // Enable fetching more posts
    await fetchMorePosts({ refreshValue: 0 }); // Fetch fresh data
    setRefreshing(false); // Hide loading state
  };

  interface RefreshValue {
    refreshValue: number;
  }

  const fetchMorePosts = async ({ refreshValue }: RefreshValue) => {
    const url = `${serverUrl}?page=${
      refreshValue == 0 ? 0 : startFrom
    }&limit=5`;

    try {
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        const data: PostResponseConfig = await response.json();
        const postRes = data.postData;

        if (postRes && postRes.length > 0) {
          // Filter out duplicates before updating state
          setPostData((prevData) => {
            const newPosts = postRes.filter(
              (post) =>
                !prevData?.some(
                  (existingPost) => existingPost.post_name === post.post_name
                )
            );
           
            return [...(prevData || []), ...newPosts];
          });
          setStartFrom((prev) => prev + 1);
        
        } else {
          setHasMorePosts(false);
        }
      } else {
        console.error("Failed to fetch more posts");
        setHasMorePosts(false);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  const debouncedFunction = debounce(async () => {
    await fetchMorePosts({ refreshValue: 1 });
    setLoading(false);
  }, 1000);

  const triggerMorePosts = async () => {
    if (loading || !hasMorePosts || startFrom === 0) return;
    console.log("onEndReached triggered!");
    setLoading(true);
    debouncedFunction();
  };

  useEffect(() => {
    setLoading(true);
    fetchMorePosts({ refreshValue: 1 });
    setLoading(false);
  }, []);

  const renderItem = ({ item }: { item: PostDataInterface }) => (
    <SingleImagePost data={item} />
  );

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={[styles.text, { color: colors.text }]}>
              Loading more posts...
            </Text>
          </>
        ) : hasMorePosts ? (
          <Text style={[styles.text, { color: colors.text }]}>
            Scroll down for more posts...
          </Text>
        ) : (
          <Text style={[styles.text, { color: colors.text }]}>End of page</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.feed_container}>
      <View style={styles.header}>
        <Text style={[style.centerText, { color: colors.text }]}>
          Minimal Blog
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={postData}
        renderItem={renderItem} // Use the debounced function for scrolling
        keyExtractor={(item) => item.post_name}
        onEndReached={() => triggerMorePosts()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Set to true while loading
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  feed_container: {
    flex: 1,
  },
  header: {
    padding: 10,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20, // Ensures spacing
    marginBottom: 50, // Moves it above the tab bar
  },
  text: {
    fontSize: 16,
  },
});
