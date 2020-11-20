import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  ActivityIndicator, FlatList, View, StyleSheet
} from 'react-native';
import { COLOR_PRIMARY_LIGHT } from '../../consts/colors';

const MyFlatList = forwardRef(({
  renderItem, source, horizontal = false, emptyComponent
}, ref) => {
  const [loading, setLoading] = useState(true);
  const [endValues, setEndValues] = useState(false);
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [valuesList, setValuesList] = useState([]);

  useImperativeHandle(ref, () => ({
    async refresh() {
      await fetchValues();
    },
    clear() {
      setValuesList([]);
      setOffset(0);
      setEndValues(false);
    }
  }));

  const fetchValues = async () => {
    setLoading(true);
    const buffValues = await source(limit, offset);

    if (buffValues.length === null || buffValues.length === 0) {
      setEndValues(true);
    } else {
      setValuesList(valuesList.concat(buffValues));
      setOffset(offset + buffValues.length);
    }
    setLoading(false);
  };

  const contextListFooter = () => {
    if (endValues === false && loading === true) {
      return (
        <View>
          <ActivityIndicator
            animating
            size="large"
            color={COLOR_PRIMARY_LIGHT}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      data={valuesList}
      keyExtractor={(item) => { return item.id.toString(); }}
      onEndReached={async () => {
        await fetchValues();
      }}
      style={styles.listContainerStyle}
      onEndReachedThreshold={0.5}
      initialNumToRender={limit}
      ListFooterComponent={contextListFooter()}
      renderItem={renderItem}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={emptyComponent}
    />
  );
});

const styles = StyleSheet.create({
  listContainerStyle: {
    width: '100%'
  }
});

export default MyFlatList;
