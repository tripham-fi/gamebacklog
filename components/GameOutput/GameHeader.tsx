import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../store/theme-context";
import { Theme } from "../../constants/styles";
import { useState } from "react";
import Input from "../UI/Input";
import DropdownMenu from "../UI/DropdownMenu";
import { DealsRequest, SORT_BY_OPTIONS } from "../../constants/requests";
import CheckBox from "../UI/CheckBox";

type HeaderProp = {
  filter: DealsRequest;
  onApply: (e: DealsRequest) => void;
};

export default function GameHeader({ filter, onApply }: HeaderProp) {
  const [open, setOpen] = useState(false);
  const [draftFilter, setDraftFilter] = useState<DealsRequest>(filter);
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  function openModal() {
    setDraftFilter(filter);
    setOpen(true);
  }

  function handleApplyFilter() {
    onApply(draftFilter);
    setOpen(false);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Top Deals</Text>
      <Pressable
        onPress={openModal}
        style={({ pressed }) => [styles.filterBar, pressed && styles.pressed]}
      >
        <Ionicons name="filter" size={18} color={theme.colors.textMuted} />
        <Text style={styles.filterText}>Filter</Text>
      </Pressable>
      <Modal visible={open} transparent onRequestClose={() => setOpen(false)}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />

          <View style={styles.modalContent}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScroll}
            >
              <Input
                label="Min"
                value={draftFilter.lowerPrice}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setDraftFilter((current) => ({
                    ...current,
                    lowerPrice: text,
                  }))
                }
              />
              <Input
                label="Max"
                value={draftFilter.upperPrice}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setDraftFilter((current) => ({
                    ...current,
                    upperPrice: text,
                  }))
                }
              />
              <DropdownMenu
                label="Sort by"
                onChange={(text) =>
                  setDraftFilter((current) => ({
                    ...current,
                    sortBy: text as DealsRequest["sortBy"],
                  }))
                }
                options={SORT_BY_OPTIONS}
                value={draftFilter.sortBy ?? "DealRating"}
                renderValue={(item) => item?.label ?? "Deal Rating"}
              />

              <CheckBox
                label={draftFilter.desc === "1" ? "Descending" : "Ascending"}
                checked={draftFilter.desc === "1"}
                onChange={(checked) =>
                  setDraftFilter((current) => ({
                    ...current,
                    desc: checked ? "1" : "0",
                  }))
                }
              />

              <CheckBox
                label="On sale only"
                checked={draftFilter.onSale === "1"}
                onChange={(checked) =>
                  setDraftFilter((current) => ({
                    ...current,
                    onSale: checked ? "1" : "0",
                  }))
                }
              />

              <Pressable
                onPress={handleApplyFilter}
                style={({ pressed }) => [
                  styles.applyButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      marginBottom: 8,
    },
    label: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 16,
    },
    filterBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      height: 44,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    filterText: {
      color: theme.colors.textMuted,
      fontSize: 14,
    },
    pressed: {
      opacity: 0.75,
    },
    modalContent: {
      maxHeight: "70%",
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: theme.colors.surface,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
    },
    backdrop: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalScroll: {
      padding: 16,
      gap: 12,
      paddingBottom: 24,
    },
    applyButton: {
      marginTop: 8,
      height: 48,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary400,
    },
    applyText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
};
