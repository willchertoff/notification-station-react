import { EventEmitter } from 'events';
import Constants from './Constants';

const getTime = () => {
  const d = new Date();
  return d.getTime();
};

class NotificationStation extends EventEmitter {
  constructor() {
    super();
    this.toNotify = [];
  }

  create(notification) {
    const defaultNotification = {
      id: getTime(),
      clname: 'info',
      title: null,
      body: null,
      timeOut: 5000,
      onClick: null,
      priority: false,
    };
    if (notification.priority) {
      this.toNotify.unshift({ ...defaultNotification, notification });
    } else {
      this.toNotify.push({ ...defaultNotification, notification });
    }
    this.emitChange();
  }

  remove(notification) {
    this.toNotify = this.toNotify.filter(n => notification.id !== n.id);
    this.emitChange();
  }

  emitChange() {
    this.emit(Constants.CHANGE, this.toNotify);
  }

  addChangeListener(callback) {
    this.addListener(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default NotificationStation;
