import React, {
  useCallback, useContext, useRef
} from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import AppContext from '../../context';
import { SPACING_UNIT } from '../../consts/spacing';
import MyFlatList from '../../components/MyFlatList';
import ListCompanyCard from '../../components/ListCompanyCard';
import { NAVIGATE_COMPANY_CREATE, NAVIGATE_COMPANY_DETAIL } from '../../consts/navigator';
import { COLOR_PRIMARY_LIGHT } from '../../consts/colors';

const ListCompany = ({ navigation }) => {
  const context = useContext(AppContext);
  const { user } = context;
  const refFlatList = useRef();

  useFocusEffect(
    useCallback(() => {
      async function clearAndRefresh() {
        await refFlatList.current.clear();
        await refFlatList.current.refresh();
      }
      if (context.isCompaniesModified) {
        clearAndRefresh().then(() => context.setIsCompaniesModified(false));
      } else {
        refFlatList.current.refresh();
      }
    }, [context])
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text h1> Vos entreprises</Text>
      </View>
      <View style={styles.listContainer}>
        <View style={{ marginBottom: SPACING_UNIT * 4 }}>
          <MyFlatList
            renderItem={({ item }) => (
              <ListCompanyCard
                onPress={() => navigation.navigate(NAVIGATE_COMPANY_DETAIL, { company: item })}
                company={item}
              />
            )}
            source={(limit, offset) => user.listCompanies(limit, offset)}
            ref={refFlatList}
          />
        </View>
        <ActionButton
          offsetY={10}
          offsetX={10}
          buttonColor={COLOR_PRIMARY_LIGHT}
          onPress={() => { navigation.navigate(NAVIGATE_COMPANY_CREATE); }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  listContainer: {
    flex: 0.9
  },
  titleContainer: {
    flex: 0.1,
    marginTop: SPACING_UNIT * 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ListCompany;
