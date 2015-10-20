import Dimensions from 'Dimensions';
import {StyleSheet} from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({

  container: {
    backgroundColor: '#2C2C2C',
    flex: 1,
    height: window.height,
    width: window.width * .7
  },

  menu: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 30
  },

  item: {
    fontSize: 16,
    padding: 10,
    color: '#fff'
  },

  header: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10
  }

});
