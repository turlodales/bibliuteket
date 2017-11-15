import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/Card';
import CardSection from '../components/CardSection';


//const myIcon = (<Icon name="rocket" size={30} color="#900" />)

class BookView extends Component {
  state = { book: { title: 'Matematisk Analys 3',
   loc: 'Norrköping',
   price: '350',
   author: 'Forsling Neymark',
   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sapien eros, cursus eget maximus in, tempus in sapien. Sed gravida, velit in euismod lobortis, nunc nisi tempor tellus, vel orci aliquam.',
   pic: 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/11402781_10205922494654323_1508583514649894409_o.jpg?oh=f491fa2955eb9ae204b313b648393044&oe=5AAB5ABF',
   phone: '070566434',
   email: 'hej@bokapp.com',
   seller: 'Adam Lindfors',
   date: '2017-05-42'
 } };

  render() {
   return (
     <ScrollView>
       <Card style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
         <Image style={styles.imageStyle} source={{ uri: this.state.book.pic }} />
       </Card>
       <Card>
         <CardSection>
           <Text style={styles.headingStyle}>
             { this.state.book.title }
           </Text>
           <Text style={styles.subHeadingStyle}>
             { this.state.book.author }
           </Text>
         </CardSection>
         <CardSection style={styles.rowCardStyle}>
           <View style={{ flexDirection: 'row' }}>
             <Icon name="location-on" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={[styles.subHeadingStyle, { alignSelf: 'center' }]}>
               { this.state.book.loc }
             </Text>
           </View>
           <Text style={styles.priceStyle}>
              { this.state.book.price } kr
           </Text>
         </CardSection>
       </Card>
       <Card>
         <CardSection>
           <Text style={styles.descriptionHeadingStyle}>Beskrivning</Text>
           <Text style={styles.descriptionTextStyle}>
             { this.state.book.description }
           </Text>
         </CardSection>
       </Card>
       <Card>
         <CardSection>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="person" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { this.state.book.seller }
             </Text>
           </View>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="email" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { this.state.book.email }
             </Text>
           </View>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="phone" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { this.state.book.phone }
             </Text>
           </View>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="access-time" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { this.state.book.date }
             </Text>
           </View>
         </CardSection>
       </Card>
     </ScrollView>
   );
 }
}

const styles = {
  headingStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  subHeadingStyle: {
    fontSize: 15,
    color: '#373737'
  },
  priceStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00C853',
  },
  rowCardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 375, height: 280, resizeMode: 'contain', backgroundColor: '#373737'
  },
  descriptionHeadingStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3
  },
  descriptionTextStyle: {
    fontSize: 14,
    color: '#373737'
  },
  infoStyle: {
    fontSize: 14,
    color: '#373737',
    marginBottom: 3,
  },
  iconStyle: {
    marginRight: 8
  }
};

export default BookView;
