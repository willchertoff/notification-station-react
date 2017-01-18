import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const propTypes = {
  timeOut: PropTypes.number.isRequired,
  hide: PropTypes.func.isRequired,
  body: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  notification: PropTypes.obj.isRequired,
};

class Notification extends Component {
  componentDidMount = () => {
    const { timeOut, hide } = this.props;
    if (timeOut !== 0) {
      this.timer = setTimeout(hide(), timeOut);
    }
  }
  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  handleClick = () => {
    const { hide, onClick, notification } = this.props;
    if (onClick) {
      onClick();
    }
    hide(notification);
  }
  render() {
    const { body } = this.props;
    const cn = classnames('notification');
    return (
      <div className={cn}>
        <div className="notification-body" onClick={this.handleClick()} dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    );
  }
}

Notification.propTypes = propTypes;

export default Notification;
