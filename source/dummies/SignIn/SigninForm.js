import React, { Component } from 'react';
import { Button, Content, Input, Item, Spinner, Text } from "native-base";
import { Formik } from "formik";
import axios from 'axios';
import { Root, Form, Label } from 'native-base';
import validations from './validations';


export default class SigninForm extends Component {
    _handleSubmit = async ({ username, password }, bag) => {
        try {
            const { data } = await axios.post(`http://127.0.0.1:8000/api/login/`, { username, password });
            bag.setSubmitting(false);
            alert("Logged in Succesfully");
            console.log(data);
            this.props.navigation.navigate('Profile');
        } catch (e) {
            console.log(e.response);
            alert("Username of Password is wrong.");
            bag.setSubmitting(false);
            bag.setErrors(e)
        }
    };

    render() {
        return (
            <Root>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    onSubmit={this._handleSubmit}
                    validationSchema={validations}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        setFieldTouched,
                        isValid,
                        isSubmitting
                    }) => (

                            <Content style={{ padding: 10 }}>
                                <Form>
                                    <Item floatingLabel error={errors.username && touched.username}>
                                        <Label>username</Label>
                                        <Input
                                            returnKeyType={'next'}
                                            onSubmitEditing={() => this.passwordRef._root.focus()}
                                            onChangeText={handleChange('username')}
                                            value={values.username}
                                            //placeholder='username'
                                            onBlur={() => setFieldTouched('username')}
                                            autoCorrect={false}
                                            autoCapitalize={'none'}
                                        />

                                        {(errors.username && touched.username) &&
                                            <Text style={{ color: 'red' }}>{errors.username}</Text>}
                                    </Item>
                                    <Item floatingLabel error={errors.password && touched.password}>
                                        <Label>password</Label>
                                        <Input
                                            ref={ref => this.passwordRef = ref}
                                            returnKeyType={'go'}
                                            onChangeText={handleChange('password')}
                                            value={values.password}
                                            //placeholder='password'
                                            onBlur={() => setFieldTouched('password')}
                                            autoCapitalize={'none'}
                                            secureTextEntry={true}
                                        />
                                        {(errors.password && touched.password) &&
                                            <Text style={{ color: 'red' }}>{errors.password}</Text>}

                                    </Item>
                                    <Button
                                        block
                                        disabled={!isValid || isSubmitting}
                                        onPress={handleSubmit}
                                        style={{ marginTop: 10 }}>

                                        {isSubmitting && <Spinner size={'small'} color={'white'} />}
                                        <Text>Login</Text>
                                    </Button>

                                    <Button
                                        onPress={() => this.props.navigation.navigate('SignUp')}
                                        style={{ marginTop: 10, alignItems: 'center' }}>

                                        <Text>Don't have an account?</Text>
                                    </Button>

                                </Form>
                            </Content>
                        )}
                </Formik>
            </Root >
        );
    }
}
