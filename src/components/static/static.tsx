import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@styles/static.module.css'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { BrowserView } from 'react-device-detect'

// import './static.css'

export function Loader() {
  return (
    <div className={styles['loader-wrapper']}>
      <div id="loader" className="row justify-content-md-center">
        <div className="col col-auto-md">
          <div className={styles['lds-facebook']} id="inner-loader">
            <div />
            <div />
            <div />
          </div>
          <p className="lead" id="message" style={{ color: 'white' }} />
        </div>
      </div>
      <div className={styles['text-wrapper']}>
        <h1>Loading ...</h1>
        {/* <h3>This can take upto 30 seconds, please be patient with us</h3> */}
      </div>
    </div>
  )
}

export function Header() {
  return (
    <div className={styles.header}>
      <h4 className={styles.subtitle}>
        Your files are
        <span className={styles.highlight}> not uploaded anywhere.</span>
      </h4>
    </div>
  )
}

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
)

export function Footer() {
  return (
    <footer className={classNames(styles.footer, styles['footer-distributed'])}>
      <BrowserView>
        <div className={classNames(styles['footer-right'])}>
          <div className={styles['image-container']}>
            <a
              href="https://discord.gg/dnD6FHx"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon">
              <FontAwesomeIcon
                icon={faDiscord}
                style={{
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  marginBottom: '-5px'
                }}
              />
            </a>
          </div>

          <div className={styles['image-container']}>
            <div>
              <a
                href="https://github.com/modfy/modfy.video"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 256 249"
                  fill="white">
                  <g xmlns="http://www.w3.org/2000/svg">
                    <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" />
                    <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </BrowserView>

      <div className={styles['footer-left']}>
        <p className={styles['footer-links']}>
          <Link href="/" passHref>
            <a
              href="/"
              className={classNames(styles['link-class'], styles['link-1'])}>
              Home
            </a>
          </Link>

          <a
            className={styles['link-class']}
            href="https://api.modfy.video/"
            target="_blank"
            rel="noopener noreferrer">
            API
          </a>

          <a
            className={styles['link-class']}
            href="https://docs.modfy.video/"
            target="_blank"
            rel="noopener noreferrer">
            Docs
          </a>

          <a className={styles['link-class']} href="mailto:hello@modfy.video">
            Contact
          </a>

          <a
            className={styles['link-class']}
            href="https://cryogenicplanet.typeform.com/to/Fn78Sd"
            data-mode="drawer_right"
            style={{
              color: '#3FBD71',
              textDecoration: 'underline',
              fontSize: '20px'
            }}
            data-submit-close-delay="0"
            target="_blank"
            rel="noopener noreferrer">
            Join our Mailing List!
          </a>
        </p>

        <div className={styles['footer-copyright']}>
          <p>Made with </p>
          <p className={styles['footer-made-margin']}>
            <HeartSvg />
          </p>
          <p className={styles['footer-made-margin']}>{` `}by </p>
          <p className={styles['footer-made-margin']}>
            <a
              style={{ color: 'inherit' }}
              href="https://cryogenicplanet.tech/"
              target="_blank"
              rel="noopener noreferrer">
              CryogenicPlanet
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
