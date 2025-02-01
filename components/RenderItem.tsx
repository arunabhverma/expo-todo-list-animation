import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { getRandomLightColor } from "@/utils/getRandomLightColor";
import { AnimationConfig, ItemRadius, LeftItemWidth } from "@/constants/Global";

export const RenderItems = ({
  item,
  index,
  viewables,
}: {
  item: { date: string; todos: string[] };
  index: number;
  viewables: SharedValue<(number | null)[]>;
}) => {
  const theme = useTheme();
  const date = new Date(item.date);

  const animatedColumnStyle = useAnimatedStyle(() => {
    const isViewable = viewables.value.includes(index);
    const isAtStart = index < (viewables.value[0] ?? 0);
    const scale = withSpring(isViewable ? 1 : 0.5, AnimationConfig);
    const translateY = withSpring(
      isViewable ? 0 : isAtStart ? -200 : 200,
      AnimationConfig
    );
    return {
      opacity: withTiming(isViewable ? 1 : 0),
      transform: [{ scale }, { translateY }],
    };
  });

  const leftAnimatedColor = useAnimatedStyle(() => {
    const isViewable = viewables.value.includes(index);
    return {
      backgroundColor: withTiming(
        isViewable ? theme.colors.text : getRandomLightColor(),
        { duration: 300 }
      ),
    };
  });

  const rightAnimatedColor = useAnimatedStyle(() => {
    const isViewable = viewables.value.includes(index);
    return {
      backgroundColor: withTiming(
        isViewable ? theme.colors.text : getRandomLightColor(),
        { duration: 300 }
      ),
    };
  });

  return (
    <View style={styles.renderItemContainer}>
      <Animated.View
        style={[styles.leftColumn, animatedColumnStyle, leftAnimatedColor]}
      >
        <Text style={[styles.dateText, { color: theme.colors.border }]}>
          {date.getDate()}
        </Text>
      </Animated.View>
      <Animated.View
        style={[styles.rightColumn, animatedColumnStyle, rightAnimatedColor]}
      >
        {item.todos.map((todo, todoId) => (
          <View key={todoId.toString()}>
            <Text style={[styles.todoText, { color: theme.colors.border }]}>
              • {todo}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  renderItemContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 2,
  },
  leftColumn: {
    backgroundColor: "white",
    width: LeftItemWidth,
    aspectRatio: 1,
    borderRadius: ItemRadius,
    justifyContent: "center",
    borderCurve: "continuous",
    alignItems: "center",
  },
  rightColumn: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: ItemRadius,
    justifyContent: "center",
    padding: 30,
    borderCurve: "continuous",
    gap: 5,
  },
  dateText: {
    fontSize: 90,
    fontWeight: "900",
  },
  todoText: {
    fontSize: 20,
  },
});
