import api from '../api/index';
import Component from '../components/basecomponent';
import Button from '../components/button';
import InputField from '../components/input-field';
import app from '../core/app';
import user from '../storage/user';

class SignupView extends Component {
    constructor () {
        super();
        this.attributes.error = null;
        const passwordInput = new InputField({
            placeholder: 'Пароль',
            type: 'password',
            validation: [
                (value) => {
                    return value.length >= 6 ? null : 'Введите минимум 6 символов';
                }
            ]
        });

        this.form = [
            new InputField({
                placeholder: 'Никнейм',
                validation: [
                    (value) => {
                        return value !== '' ? null : 'Поле не должно быть пустым';
                    },
                    (value) => {
                        return length < 255 ? null : 'Никнейм слишком длинный';
                    }
                ]
            }),
            new InputField({
                placeholder: 'Эл. почта',
                type: 'email',
                validation: [
                    (email) => {
                        const re =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        const isValid = re.test(String(email).toLowerCase());

                        return isValid ? null : 'Email не валиден';
                    }
                ]
            }),
            passwordInput,
            new InputField({
                placeholder: 'Подтвердите пароль',
                type: 'password',
                validation: [
                    (value) => {
                        return value !== '' ? null : 'Поле не должно быть пустым';
                    },
                    (value) => {
                        return passwordInput.getValue() === value
                            ? null
                            : 'Пароли не совпадают';
                    }
                ]
            })
        ];
    }

    async submit (e) {
        e.preventDefault();

        const errors = Math.max(...this.form.map((e) => e.validate().length));
        if (errors) return;

        this.attributes.error = null;
        this.attributes.loading = true;
        const res = await api.register({
            username: this.form[0].getValue(),
            email: this.form[1].getValue(),
            password: this.form[2].getValue()
        });
        this.attributes.loading = false;

        if (res.error) {
            if (res.data.error === 'user already exist') {
                this.attributes.error = 'Пользователь с данной почтой уже существует.';
                return;
            }
            this.attributes.error = res.data.error;
            return;
        }
        await api.login({
            email: this.form[1].getValue(),
            password: this.form[2].getValue()
        });

        user.update();
        this.attributes.loading = false;
    }

    render () {
        return (
            <div className="auth-block">
                <h1> Регистрация </h1>
                <form
                    className="auth-card shadow"
                    onSubmit={(e) => {
                        this.submit(e);
                    }}
                >
                    {this.form.map((c) => c.renderReactive())}
                    {
                        this.attributes.error
                            ? <div className="error">
                                {this.attributes.error}
                            </div>
                            : ''
                    }

                    <Button
                        text="Зарегистрироваться"
                        color="primary"
                        rounded={true}
                        loading={this.attributes.loading}
                        onclick={(e) => {
                            this.submit(e);
                        }}
                    />
                </form>
                <span className="auth-card__tooltip">
                    Уже есть аккаунт? <a href="#" router-go={app.$router.createUrl('signin')}>Войти</a>
                </span>
            </div>
        );
    }

    created () {
        if (user.user) return app.$router.go('/');
    }
}

export default SignupView;
