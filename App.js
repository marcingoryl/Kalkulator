import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Dimensions} from 'react-native';

export default class App extends Component {

  
  constructor(props) {
    super(props)

    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      display: '',
      result: '',
      orientation: isPortrait() ? 'portrait': 'landscape'
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });
    
  }
  
  handleOp = (op) => {
    if(op==='AC'){
      this.setState({
        display: '',
        result: ''
      })
    }else if(op=== '=') {
      this.setState({
        display: this.state.result,
        result: ''
      })
    }else if(op == 'x³'){
      const display = this.state.display+op
      let result = this.state.result
      result = Math.pow(result, 3)
      this.setState({
        display: result,
        result: ''
      })
    }
    else if(op == 'x²'){
      const display = this.state.display+op
      let result = this.state.result
      result = Math.pow(result, 2)
      this.setState({
        display: result,
        result: ''
      })
    }
    else if(op == 'ln'){
      const display = this.state.display+op
      let result = this.state.result
      result = Math.log(result)
      this.setState({
        display: result,
        result: ''
      })
    }
    else if(op == 'log₁₀'){
      const display = this.state.display+op
      let result = this.state.result
      result = Math.log10(result)
      this.setState({
        display: result,
        result: ''
      })
    }
    else if(op == 'eˣ'){
      const display = this.state.display+op
      let result = this.state.result
      result = Math.exp(result)
      this.setState({
        display: result,
        result: ''
      })
    }
    else if(op == '10ˣ'){
      const display = this.state.display+op
      let result = this.state.result
      result = Math.pow(10, result)
      this.setState({
        display: result,
        result: ''
      })
    }
    else if(op == 'x!'){
      const display = this.state.display+op
      let result = this.state.result

      let answer = 1;
      if (result != 0 || result != 1){
      
        for(var i = result; i >= 1; i--){
          answer = answer * i;
        }
        result = answer;
      } 
      this.setState({
        display: result,
        result: ''
      })
    }
    else if(op == '+/-'){
      const display = this.state.display+op
      let result = this.state.result
      result *= (-1)
      this.setState({
        display: result,
        result: result
      })
    }
    else if(op == '%'){
      const display = this.state.display+op
      let result = this.state.result
      result /= (100)
      this.setState({
        display: result,
        result: ''
      })
    }
   /* else if(op == 'e'){
      const e = '2,71828'    
      const display = this.state.display+e
      let result = this.state.result
      this.setState({
        display: display,
        result: result
      })
    } */

    else {
      const display = this.state.display+op
      let result = this.state.result
      try {
        let fixedOperaction = display.split('x').join('*')
        fixedOperaction = fixedOperaction.split('÷').join('/')
        fixedOperaction = fixedOperaction.split(',').join('.')
        fixedOperaction = fixedOperaction.split('π').join('3.14')
        fixedOperaction = fixedOperaction.split('e').join('2.71828')
        if(fixedOperaction[1] == '√')
        {
        nums = fixedOperaction.match(/\d+/g);
        fixedOperaction = Math.pow(nums[0], 1/nums[1]);
        }
        result = new String(eval(fixedOperaction)).toString()
       
      }catch(e){}
    
    this.setState({
      display,
      result
    })
  }
}

   
  render() {

    if(this.state.orientation == 'portrait'){

    const col1Buttons = [
      ['AC', ' ', '  ' ],
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      ['0', '', ',']
    ]

    const col2Buttons = ['÷', 'x', '-', '+', '=']
    return (
      <View style={styles.container}>
        <Text style={styles.displayVertical}>{ this.state.display } </Text>
        <View style={styles.buttons}>
          <View style={styles.col1}> 
            { col1Buttons.map( (line, ind) => <View  key={ind} style={styles.line}>                     
              { line.map( (op) => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
                <Text  style={styles.btnText}>
                  {op}
                </Text>
              </TouchableOpacity> )}                
            </View> )}
          </View>
          <View style={styles.col2}>
            { col2Buttons.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
              <Text  style={styles.btnText}>
                {op}
              </Text>
            </TouchableOpacity> )}                
          </View>            
        </View>    
      </View>             
    );
  } 

  else {

    const col1Buttons = [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      ['0', '', ',']
    ]

    const col2Buttons = ['÷', 'x', '-', '+', '=']
    const col3Buttons = [
      ['√', 'x!'],
      ['eˣ','10ˣ'],
      ['ln','log₁₀'],
      ['e', 'x²'],
      ['π', 'x³']
    ]
    const row1Buttons = [
        ['AC', '+/-', '%'], 
      ];

    return(
      <View style={styles.container}>
        <Text style={styles.displayHorizontal}>{ this.state.display } </Text>
        <View style={styles.buttons}>
         
          <View style = {styles.col3}>
            { col3Buttons.map( (line, ind) => 
            <View  key={ind} style={styles.line}>                     
              { line.map( (op) => 
                <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
                  <Text  style={styles.btnText}>
                   {op}
                  </Text>
                </TouchableOpacity> )}                
            </View> )}       
          </View>

          
          <View style = {styles.verticalView}>

          <View style={styles.row1}> 
              { row1Buttons.map( (line, ind) => <View  key={ind} style={styles.line}>                     
                { line.map( (op) => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
                  <Text  style={styles.btnText}>
                   {op}
                 </Text>
                </TouchableOpacity> )}                
              </View> )}
            </View>
            
            <View style={styles.col1}> 
              { col1Buttons.map( (line, ind) => <View  key={ind} style={styles.line}>                     
                { line.map( (op) => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
                  <Text  style={styles.btnText}>
                   {op}
                 </Text>
                </TouchableOpacity> )}                
              </View> )}
            </View>

          </View>

          <View style={styles.col2}>
            { col2Buttons.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
              <Text  style={styles.btnText}>
                {op}
              </Text>
            </TouchableOpacity> )}                
          </View>            
        </View>    
      </View>             
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  displayVertical: {
    flex: 1,
    backgroundColor: '#484848',
    fontSize: 70,
    color: 'white',
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10
  },
  displayHorizontal: {
    flex: 2,
    backgroundColor: '#484848',
    fontSize: 70,
    color: 'white',
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10
  },
  verticalView:{
    flexDirection: 'column',
    flex: 5
  },
  buttons: {
    flex: 5,
    flexDirection: 'row',
  },
  col1: {
    flex: 3,
    backgroundColor: '#787878',
    justifyContent: 'center'
  },
  line: {
    flexDirection: 'row',
    flex: 1
  },
  btn: {
    flex: 1,
    justifyContent: 'center'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 35,
    color: 'white'

  },
  col2: {
    flex: 1,
    backgroundColor: '#ffa500',
  },
  col3: {
    flex:3,
    backgroundColor: '#505050',
    justifyContent: 'center'
  },
  row1: {
    flex:1,
    backgroundColor: '#505050',
    justifyContent: 'center'
  }
});