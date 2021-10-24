import Component from './basecomponent.js';

/**
 * Компонент лайка
 */

class Like extends Component {
    constructor ({
        user = null,
        liked = false,
        count = 0
    }) {
        super();
        this.attributes.user = user;
        this.attributes.liked = liked;
        this.attributes.count = count;
    }

    render () {
        if (!this.attributes.user) {
            return (
                <div className="like">
                    <button disabled className='like-link'/>
                    <span className="likes-count">{this.attributes.count}</span>
                </div>
            );
        }
        return (
            <div className="like">
                <button onClick={(e) => {
                    this.hasLike(e);
                }} className={['like-link', this.attributes.liked ? 'has-like' : '']}/>
                <span className="likes-count">{this.attributes.count}</span>
            </div>
        );
    }

    hasLike (e) {
        e.preventDefault();

        if (!this.attributes.liked) {
            document.querySelector('.like-link').classList.add('has-like');

            this.attributes.count++;
            this.attributes.liked = true;
        } else {
            document.querySelector('.like-link').classList.remove('has-like');

            this.attributes.count--;
            this.attributes.liked = false;
        }
    }
}

export default Like;

const styles = `
.like {
    display: flex;
    align-items: center;
}

.like-link {
    display: flex;
    background-image: url(../../imgs/not-liked.png);
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
}

.has-like {
    background-image: url(../../imgs/liked.png);
}

.likes-count {
    margin-left: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);