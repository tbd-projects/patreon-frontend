import Component from 'irbis/component';
import './style.scss';

/**
 * Компонент карточки профиля
 */
class ProfileCard extends Component {
    defaultProps () {
        return {
            username: '',
            avatar: null,
            supportCount: 0
        };
    }

    constructor (_, ...slot) {
        super();
        this.slot = slot;
    }

    render () {
        return (<div className="profile-card">
            <div
                className="profile-card__avatar"
                style={`background-image:url('${this.attributes.avatar}')`}
            />

            <div className="profile-card__body">
                <div className="profile-card__username">
                    {this.attributes.username}
                </div>

                <div
                    className="profile-card__support-count"
                    style={this.slot ? 'margin-bottom:20px' : ''}
                >
                    Поддерживает
                    {' '}

                    {this.attributes.supportCount}

                    {' '}
                    авторов
                </div>

                {this.slot ? this.slot : ''}
            </div>
        </div>);
    }
}
export default ProfileCard;