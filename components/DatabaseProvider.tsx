import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ReactNode } from "react";
import migrations from "../drizzle/migrations";
import { db, expoDb } from "../db/client";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { ActivityIndicator, Text, View } from "react-native";

export default function DatabaseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expoDb);

  if (error) return <Text>Database error: {error.message}</Text>;
  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <>{children}</>;
}
