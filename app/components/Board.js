import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native';

export default class Board extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            boardState: [
                [0,0,0],
                [0,0,0],
                [0,0,0],
            ],
            lastTap : 0
        };
        this.ended = false;
        this.winningCells = [];
        this.initGame = this.initGame.bind(this);
    }

    initGame() {
        this.setState({
            boardState: [
                [0,0,0],
                [0,0,0],
                [0,0,0],
            ],
            lastTap : 0
        });
        this.ended = false;
        this.winningCells = [];
    }

    renderIcon(row, col){
        var value = this.state.boardState[row][col];
        switch(value){
            case -1: return <Text style={{fontSize: 50}}>X</Text>
            case 1: return <Text style={{fontSize: 50}}>O</Text>
            default: return <View/>
        }
    }

    onCellPress(row, col){
        var value = this.state.boardState[row][col];
        //Only empty cells can selected
        if(value != 0 || this.ended){
            return;
        }

        var lastTap = this.state.lastTap >= 0 ? -1 : 1;
        var boardValues = this.state.boardState;
        boardValues[row][col] = lastTap;

        this.setState({
            boardState: boardValues,
            lastTap: lastTap
        });

        var sum = this.computeSum();
        if(sum == -3){
            this.ended = true;
            Alert.alert("Player 1 is the winner!");
        }
        if(sum == 3){
            this.ended = true;
            Alert.alert("Player 2 is the winner!");
        }
    }

    computeSum(){
        var sum = 0;
      
        var values = this.state.boardState;
        //Add the rows
        for(var i = 0; i < 3; i++){
            sum = values[i][0] + values[i][1] + values[i][2];
            if(sum == -3 || sum == 3) {
                this.winningCells = [i+"0", i+"1", i+"2"]; 
                return sum;
            }
        }
        
        //Add the columns
        for(var i = 0; i < 3; i++){
            sum = values[0][i] + values[1][i] + values[2][i];
            if(sum == -3 || sum == 3) {
                this.winningCells = ["0"+i, "1"+i, "2"+i]; 
                return sum;
            }
        }
        
        //Add the diagnols
        sum = values[0][0] + values[1][1] + values[2][2];
        if(sum == -3 || sum == 3) {
            this.winningCells = ["00", "11", "22"]; 
            return sum;
        }

        sum = values[2][0] + values[1][1] + values[0][2];
        if(sum == -3 || sum == 3) {
            this.winningCells = ["20", "11", "02"]; 
            return sum;
        }
        return sum;
    }

    render() {
        return (
          <View style={styles.container}>

            <Text style={{color: "#183446", fontSize: 25, fontWeight:'700'}}>Tic Tac Toe</Text>
            <View style={{paddingTop: 30}} />

            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={()=>this.onCellPress(0, 0) } style={[styles.cell, this.winningCells.includes('00') && styles.greenCell]}>
                    {this.renderIcon(0, 0)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.onCellPress(0, 1) } style={[styles.cell, this.winningCells.includes('01') && styles.greenCell]}>
                    {this.renderIcon(0, 1)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.onCellPress(0, 2) } style={[styles.cell, this.winningCells.includes('02') && styles.greenCell, {borderRightWidth: 5}]}>
                    {this.renderIcon(0, 2)}
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={()=>this.onCellPress(1, 0) } style={[styles.cell, this.winningCells.includes('10') && styles.greenCell]}>
                    {this.renderIcon(1, 0)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.onCellPress(1, 1) } style={[styles.cell, this.winningCells.includes('11') && styles.greenCell]}>
                    {this.renderIcon(1, 1)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.onCellPress(1, 2) } style={[styles.cell, this.winningCells.includes('12') && styles.greenCell, {borderRightWidth: 5}]}>
                    {this.renderIcon(1, 2)}
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={()=>this.onCellPress(2, 0) } style={[styles.cell, this.winningCells.includes('20') && styles.greenCell, {borderBottomWidth: 5}]}>
                    {this.renderIcon(2, 0)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.onCellPress(2, 1) } style={[styles.cell, this.winningCells.includes('21') && styles.greenCell, {borderBottomWidth: 5}]}>
                    {this.renderIcon(2, 1)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.onCellPress(2, 2) } style={[styles.cell, this.winningCells.includes('22') && styles.greenCell, {borderBottomWidth: 5, borderRightWidth: 5}]}>
                    {this.renderIcon(2, 2)}
                </TouchableOpacity>
            </View>

            <View style={{paddingTop: 30}} />
            <Button color="#333" title="New Game" onPress={this.initGame}/>

          </View>
        );
     }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },

    cell: {
        borderTopWidth: 5,
        borderLeftWidth: 5,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },

    greenCell: {
        backgroundColor: '#32CD32'
    }


  });