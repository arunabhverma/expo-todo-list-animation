import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TODO_LIST } from "@/constants/TODO_LIST";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaskedView from "@react-native-masked-view/masked-view";
import { Mask } from "@/components/Mask";
import { useSharedValue } from "react-native-reanimated";
import { RenderItems } from "@/components/RenderItem";
import { ItemRadius } from "@/constants/Global";

export default function () {
  const { top, bottom } = useSafeAreaInsets();
  const viewables = useSharedValue<(number | null)[]>([]);

  return (
    <View
      style={[styles.container, { marginTop: top, marginBottom: bottom + 20 }]}
    >
      <MaskedView maskElement={<Mask />}>
        <FlatList
          data={TODO_LIST}
          keyExtractor={(i) => i.date}
          contentContainerStyle={{ gap: 2 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RenderItems item={item} index={index} viewables={viewables} />
          )}
          onViewableItemsChanged={({ viewableItems }) => {
            viewables.value = viewableItems.map((item) => item.index);
          }}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 5 }}
        />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: ItemRadius,
    overflow: "hidden",
  },
});
