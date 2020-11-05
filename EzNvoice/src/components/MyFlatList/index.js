import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { COLOR_PRIMARY_LIGHT } from '../../consts/colors';

const MyFlatList = forwardRef(({ renderItem, source }, ref) => {
  const [loading, setLoading] = useState(true);
  const [endValues, setEndValues] = useState(false);
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [companiesList, setCompaniesList] = useState([]);

  useImperativeHandle(ref, () => ({
    async refresh() {
      await fetchCompanies();
    }
  }));

  const fetchCompanies = async () => {
    setLoading(true);
    const buffValues = await source(limit, offset);
    if (buffValues.length === null || buffValues.length === 0) {
      setEndValues(true);
    } else {
      setCompaniesList(companiesList.concat(buffValues));
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
      data={companiesList}
      keyExtractor={(item) => { return item.id.toString(); }}
      onEndReached={async () => {
        await fetchCompanies();
      }}
      onEndReachedThreshold={0.5}
      initialNumToRender={limit}
      ListFooterComponent={contextListFooter()}
      renderItem={renderItem}
    />
  );
});

export default MyFlatList;
