import React, { Component } from 'react';
import classnames from 'classnames';
import NotificationStation from './NotificationStation';
import Notification from './Notification';

class NoficationsContainer extends Component {
  constructor() {
    super();
    this.state = {
      notfications: [],
    };
  }
  componentWillMount = () => {
    NotificationStation.addChangeListener(this.notificationListChange);
  }
  componentWillUnmount = () => {
    NotificationStation.removeChangeListener(this.notificationListChange);
  }
  notificationListChange = (notifications) => {
    this.setState({
      notifications,
    });
  }
  dismissNotification = (notification) => {
    NotificationStation.remove(notification);
  }
  render() {
    const { notifications } = this.state;
    const cn = classnames('notifications-container', {
      'notifications-empty': notifications.length === 0,
    });
    return (
      <div className={cn}>
        {
          notifications.map(notification =>
            <Notification
              notification={notification}
              clname={notification.clname}
              timeOut={notification.timeOut}
              body={notification.body}
              onClick={notification.onClick}
              hide={this.dismissNotification}
            />,
          )
        }
      </div>
    );
  }
}

export default NoficationsContainer;
