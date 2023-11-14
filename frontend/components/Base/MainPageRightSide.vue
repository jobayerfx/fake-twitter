<template>
    <v-col cols="12" md="6" class="main-page__right-side">

        <v-row class="mt-8 mx-2" justify="center">
            <v-col cols="12" md="10">
                <h1 class="mt-4 mb-12 heading-text">Happening now</h1>
                <h4 class="mt-8 mb-6 sub-heading-text">Join today.</h4>
                <v-btn rounded outlined width="320" class="text-capitalize py-2 mt-4">
                    <v-icon left>
                        mdi-apple
                    </v-icon>
                    Sign up with Apple
                </v-btn>
                <v-divider class="my-2"></v-divider>
                <v-dialog v-model="registerDialog" persistent width="600">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" rounded width="320" v-bind="attrs" class="py-2 text-capitalize" v-on="on">
                            Create your account
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="pl-4 d-flex justify-space-between">
                            <div>
                                <v-btn class="mr-auto" icon color="black" @click="registerDialog = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <span class="headline">Sign un to X </span>
                            </div>
                        </v-card-title>

                        <v-card-text class="p-8">
                            <v-spacer></v-spacer>
                            <v-form v-model="registerValid" class="pa-8">
                                <v-text-field v-model="userName" filled label="Username" type="text" :rules="userNameRules"
                                    prepend-inner-icon="mdi-at" counter="50" background-color="#f5f8fa"
                                    outlined></v-text-field>
                                <v-text-field v-model="registerFullname" filled label="Full name" type="text"
                                    :rules="registerFullnameRules" counter="100" background-color="#f5f8fa"
                                    outlined></v-text-field>
                                <v-text-field v-model="registerEmail" filled label="Email" type="email"
                                    :rules="registerEmailRules" background-color="#f5f8fa" outlined></v-text-field>
                                <v-text-field v-model="registerPassword" filled label="Password" type="password"
                                    :rules="registerPasswordRules" background-color="#f5f8fa" outlined></v-text-field>

                                <p class="font-weight-bold">Date of birth</p>
                                <p>
                                    This will not be shown publicly. Confirm your own age, even if this account is for a
                                    business, a pet, or something else.
                                </p>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-select v-model="registerMonthSelected" :items="registerMonth" filled
                                            label="Month" background-color="#f5f8fa" append-icon="mdi-chevron-down"
                                            outlined></v-select>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-select v-model="registerDaySelected" :items="registerDay" filled label="Day"
                                            background-color="#f5f8fa" append-icon="mdi-chevron-down" outlined></v-select>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-select v-model="registerYearSelected" :items="registerYear" filled label="Year"
                                            background-color="#f5f8fa" append-icon="mdi-chevron-down" outlined></v-select>
                                    </v-col>
                                </v-row>
                                <v-btn color="primary" rounded block :disabled="!registerValid" :loading="isLoading"
                                    class="ml-auto text-capitalize" @click="tryToRegister">Register</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <h2 class="mt-8 mb-2">Already have an account?</h2>
                <v-dialog v-model="loginDialog" persistent width="600">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" rounded outlined width="320" v-bind="attrs" class="text-capitalize py-2 mt-4"
                            v-on="on">
                            Sign in
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="pl-4 d-flex justify-space-between">
                            <div>
                                <v-btn class="mr-auto" icon color="black" @click="loginDialog = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <span class="headline">Sign in to X </span>
                            </div>
                        </v-card-title>


                        <v-card-text>
                            <v-form>
                                <v-text-field v-model="loginInfo.email" filled label="Email or username" type="email"
                                    :rules="emailUsernameRule" background-color="#f5f8fa" outlined></v-text-field>
                                <v-text-field v-model="loginInfo.password" filled label="Password" type="password"
                                    :rules="registerPasswordRules" background-color="#f5f8fa" outlined></v-text-field>

                                <v-btn color="primary" rounded block class="ml-auto text-capitalize" :loading="isLoading"
                                    @click="userLogin()">Login</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>

            </v-col>
        </v-row>
        <BaseVSnackbar :is-visible="snackbarError" />
    </v-col>
</template>

<script>
import { mapActions } from 'vuex';
import { AuthApi } from '@/service'
export default {
    name: "MainPageRightSide",
    data() {
        return {
            userName: '',
            registerFullname: '',
            registerEmail: '',
            registerPassword: '',
            registerDialog: false,
            registerValid: false,
            isLoading: false,
            snackbarError: false,
            emailUsernameRule: [(v) => !!v || 'Email or Username is required'],
            userNameRules: [
                (v) => !!v || 'Username is required',
                (v) => v.length <= 50 || '',
            ],
            registerFullnameRules: [
                (v) => !!v || 'Name required',
                (v) => v.length <= 100 || '',
            ],
            registerEmailRules: [
                (v) =>
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        v
                    ),
            ],
            registerPasswordRules: [
                (v) => v.length >= 6 || 'Too short password',
            ],
            registerMonthSelected: 'January',
            registerDaySelected: 1,
            registerYearSelected: 2020,
            registerMonth: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            registerDay: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31,
            ],
            registerYear: [
                2020,
                2019,
                2018,
                2017,
                2016,
                2015,
                2014,
                2013,
                2012,
                2011,
                2010,
                2009,
                2008,
                2007,
                2006,
                2005,
                2004,
                2003,
                2002,
                2001,
                2000,
                1999,
                1998,
                1997,
                1996,
                1995,
                1994,
                1993,
                1992,
                1991,
                1990,
                1989,
                1988,
                1987,
                1986,
                1985,
                1984,
                1983,
                1982,
                1981,
                1980,
                1979,
                1978,
                1977,
                1976,
                1975,
                1974,
                1973,
                1972,
                1971,
                1970,
                1969,
                1968,
                1967,
                1966,
                1965,
                1964,
                1963,
                1962,
                1961,
                1960,
                1959,
                1958,
                1957,
                1956,
                1955,
                1954,
                1953,
                1952,
                1951,
                1950,
                1949,
                1948,
                1947,
                1946,
                1945,
                1944,
                1943,
                1942,
                1941,
                1940,
                1939,
                1938,
                1937,
                1936,
                1935,
                1934,
                1933,
                1932,
                1931,
                1930,
                1929,
                1928,
                1927,
                1926,
                1925,
                1924,
                1923,
                1922,
                1921,
                1920,
                1919,
                1918,
                1917,
                1916,
                1915,
                1914,
                1913,
                1912,
                1911,
                1910,
                1909,
                1908,
                1907,
                1906,
                1905,
                1904,
                1903,
                1902,
                1901,
                1900,
            ],
            loginInfo: {
                email: '',
                password: ''
            },
            loginDialog: false,
            isLoggedIn: false
        };
    },
    methods: {
        ...mapActions({
            // register: 'account/register',
            login: 'account/login',
        }),

        async tryToRegister() {
            try {
                this.isLoading = true;
                let birthdayString =
                    this.registerDaySelected +
                    ' ' +
                    this.registerMonthSelected +
                    ' ,' +
                    this.registerYearSelected;
                // console.log(new Date(birthdayString));
                birthdayString = this.getFormatedDate(birthdayString);
                const formData = {
                    username: this.userName,
                    name: this.registerFullname,
                    email: this.registerEmail,
                    password: this.registerPassword,
                    password_confirmation: this.registerPassword,
                    dob: birthdayString,
                };
                // const { data } = await this.register(formData);
                const { data } = await AuthApi(this.$axios).register(formData)
                this.registerDialog = false;
                this.loginDialog = true;
                this.$toast.success(data.message);

            } catch (err) {
                this.$toast.error(err.response.data.message);
                this.isLoading = false;
                console.error(err);
            } finally {
                this.isLoading = false
            }
        },
        async userLogin() {
            // console.log('user login');
            try {
                this.isLoading = true
                // if (this.$refs.form.validate()) {
                const { data } = await this.$auth.loginWith('local', {
                    data: this.loginInfo
                })
                // console.log(data);
                if (data.error === false) {
                    return this.$router.push('/home')
                }
                // }
            } catch (err) {
                console.log(err.response.data.message);
                this.$toast.error(err.response.data.message)
            } finally {
                this.isLoading = false
            }
        }
    },
};
</script>

<style scoped>
.main-page__right-side {
    height: calc(100vh - 78px);
}

.main-page__register-dialog__twitter-icon {
    position: absolute;
    left: 50%;
}

.heading-text {
    font-size: 4rem;
    font-weight: 700;
    line-height: 5rem;
    letter-spacing: -1.2px;
}

.sub-heading-text {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 2rem;
    letter-spacing: -1.2px;
}
</style>