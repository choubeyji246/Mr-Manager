import React from "react";
import { FlatList, Text, View } from "react-native";

interface MemberListProps {
  members: Array<{ email: string; role?: string }>;
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
  const renderMembers = ({ item }: { item: { email: string; role?: string } }) => (
    <View>
      <Text>Email: {item.email}</Text>
      {item.role && <Text>Role: {item.role}</Text>}
    </View>
  );

  return (
    <FlatList
      data={members}
      keyExtractor={(item) => item.email}
      renderItem={renderMembers}
    />
  );
};

export default MemberList;
