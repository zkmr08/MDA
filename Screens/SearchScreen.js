import React, { Component } from 'react';
import { TextInput, View, Text, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export default class SearchScreen extends Component {
    constructor() {
        super()
        this.state = {
            itemName: '',
            courseType: '',
            darkMode: false
        }
        this.itemNameChange = this.itemNameChange.bind(this)
        this.courseTypeChange = this.courseTypeChange.bind(this)
        this.search = this.search.bind(this)
    }

    themeMode() { this.setState({ darkMode: !this.state.darkMode }) }

    search() {
        if (this.state.itemName.match(/^s*$/)) { return }
        let courseTypeString = ''
        const itemNameString = '&search_text=' + this.state.itemName
        if (this.state.courseType.match(/^s*$/)) {
            courseTypeString = '?Type[]=classroom&Type[]=elearning&Type[]=mobile&Type[]=webinar&Type[]=learning_plan'
        } else {
            const courseTypesEntered = this.state.courseType.split(', ')
            for (let courseTypeEntered of courseTypesEntered) {
                if (courseTypeString == '') { courseTypeString = '?type[]=' + courseTypeEntered }
                else { courseTypeString = courseTypeString + '&type[]=' + courseTypeEntered }
            }
        }

        this.setState({
            itemName: '',
            courseType: ''
        })
        Keyboard.dismiss
    }

    itemNameChange(itemName) { this.setState({ itemName }) }

    courseTypeChange(courseType) { this.setState({ courseType }) }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, { backgroundColor: this.state.darkMode ? '#222831' : '#bae8e8' }]}>
                    <TouchableOpacity onPress={() => this.themeMode()}>
                        {this.state.darkMode ? <Text style={styles.mode}> Light mode </Text> : <Text style={styles.mode}> Dark mode </Text>}
                    </TouchableOpacity>
                    <Text style={styles.header}> Search Engine </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Item Name'
                        value={this.state.itemName}
                        onChangeText={this.itemNameChange}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Course Type'
                        value={this.state.courseType}
                        onChangeText={this.courseTypeChange}
                    />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={this.search}
                    >
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222831'
    },
    textInput: {
        height: 55,
        width: 300,
        fontSize: 25,
        borderRadius: 25,
        borderColor: 'white',
        color: 'black',
        borderWidth: 3,
        margin: 10,
        backgroundColor: '#e3f6f5',
        padding: 10
    },
    header: {
        fontSize: 50,
        color: '#df42d1',
        margin: 10,
        fontWeight: 'bold'
    },
    searchButton: {
        backgroundColor: '#00adb5',
        padding: 15,
        margin: 10,
        width: 200,
        borderRadius: 20
    },
    searchButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    mode: {
        fontSize: 20,
        backgroundColor: '#00adb5',
        borderRadius: 15,
        color: 'white',
        marginTop: 25,
        width: 120,
        height: 30,
        textAlign: 'center'
    }
})