import app from '../../core/app';
import CountersComponent from '../../counters';
import Component from '../basecomponent';
import TimeAgoComponent from '../time-ago';
import './style.scss';

class PostHeaderComponent extends Component {
    constructor ({
        size = '32px',
        title = '',
        published = null,
        views = 0,
        likes = 0,
        id = 0,
        creatorId = 0
    }) {
        super();
        this.attributes.size = size;
        this.attributes.size = size;
        this.attributes.size = size;
        this.attributes.title = title;
        this.attributes.published = published;
        this.attributes.views = views;
        this.attributes.likes = likes;

        this.attributes.id = id;
        this.attributes.creatorId = creatorId;
    }

    render () {
        return <div className="post-header">
            <p className="post-header__title" style={'font-size:' + this.attributes.size + ';'} router-go={
                app.$router.createUrl('post.view', this.attributes.creatorId + '/' + this.attributes.id)
            }>
                {this.attributes.title}
            </p>
            <div className="post-header__sub">
                <TimeAgoComponent date={this.attributes.published} />
                <CountersComponent
                    views={this.attributes.views}
                    likes={this.attributes.likes}
                />
            </div>
        </div>;
    }
}

export default PostHeaderComponent;
