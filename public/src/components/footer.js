import Component from './basecomponent.js';

class Footer extends Component {
    render () {
        const element = document.createElement('div');
        element.className = 'footer';
        element.innerHTML = `
            <div class="footer-body"> 
                © Patreon by Pyaterochka team  from Technopark Mail.ru, 2021
                <br>
                Использованы материалы freepik - <a href="https://ru.freepik.com/">ru.freepik.com</a>
            </div>
        `;

        return element;
    }
}
export default Footer;

const styles = `
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: var(--color-primary);
    padding-top: 40px;
    margin-top: 50px;
}
.footer-body {
    background-color: var(--color-primary-dark);
    width: 900px;
    max-width:100%;
    margin: auto;
    padding:20px 40px;
    border-radius:20px 20px 0 0;
    color: #fff;
    box-shadow: 0 0 4px #fff1;
}
.footer-body a { 
    color: #fff;
}

`;
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.body.appendChild(styleElement);
