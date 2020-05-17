import React, { Component } from 'react';
import { Button, Content, Input, Item, Spinner, Text, Label, Form } from "native-base";
import { Formik } from "formik";
import validations from './validations';
import axios from 'axios'

export default class SignupForm extends Component {
    _handleSubmit = async ({ email, password, username }, bag) => {
        try {
            const { data } = await axios.post(`http://127.0.0.1:8000/api/signup/`, {
                username,
                email,
                password,
            });
            bag.setSubmitting(false);
            console.log(data.access);
            if (data.access) { console.log("ehe"); }
            alert("Registered Succesfully");
            this.props.navigation.navigate('Login')
        } catch (e) {
            console.log(e.response);
            alert(e);
            bag.setSubmitting(false);
            bag.setErrors(e)
        }
    };

    render() {
        return (
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
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
                                    <Label>Username</Label>
                                    <Input
                                        returnKeyType={'next'}
                                        onSubmitEditing={() => this.emailRef._root.focus()}
                                        onChangeText={handleChange('username')}
                                        value={values.username}
                                        //placeholder='email (@sabanciuniv.edu)'
                                        onBlur={() => setFieldTouched('username')}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                    />
                                    {(errors.username && touched.username) && <Text style={{ color: 'red' }}>{errors.username}</Text>}
                                </Item>

                                <Item floatingLabel error={errors.email && touched.email}>
                                    <Label>Email</Label>
                                    <Input
                                        ref={ref => this.emailRef = ref}
                                        returnKeyType={'next'}
                                        onSubmitEditing={() => this.passwordRef._root.focus()}
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        //placeholder='email (@sabanciuniv.edu)'
                                        onBlur={() => setFieldTouched('email')}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                    />
                                    {(errors.email && touched.email) && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                                </Item>

                                <Item floatingLabel error={errors.password && touched.password}>
                                    <Label>Password</Label>
                                    <Input
                                        ref={ref => this.passwordRef = ref}
                                        returnKeyType={'next'}
                                        onSubmitEditing={() => this.passwordConfirmRef._root.focus()}
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        //placeholder='password'
                                        onBlur={() => setFieldTouched('password')}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                    />

                                    {(errors.password && touched.password) &&
                                        <Text style={{ color: 'red' }}>{errors.password}</Text>}
                                </Item>

                                <Item floatingLabel error={errors.passwordConfirm && touched.passwordConfirm}>
                                    <Label>Password Confirmation</Label>
                                    <Input
                                        ref={ref => this.passwordConfirmRef = ref}
                                        returnKeyType={'go'}
                                        onChangeText={handleChange('passwordConfirm')}
                                        value={values.passwordConfirm}
                                        //placeholder='password confirmation'
                                        onBlur={() => setFieldTouched('passwordConfirm')}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                    />

                                    {(errors.passwordConfirm && touched.passwordConfirm) &&
                                        <Text style={{ color: 'red' }}>{errors.passwordConfirm}</Text>}
                                </Item>

                                <Button
                                    block
                                    disabled={!isValid || isSubmitting}
                                    onPress={handleSubmit}
                                    style={{ marginTop: 10 }} title={'Submit'}>

                                    {isSubmitting && <Spinner size={'small'} color={'white'} />}
                                    <Text>join</Text>
                                </Button>
                            </Form>
                        </Content>
                    )}
            </Formik>
        );
    }
}
