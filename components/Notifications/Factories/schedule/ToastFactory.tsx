import React, { useEffect, useState } from 'react';
import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/ToastNotificationAbstract';
import { INotificationProps } from '@/safira-app/interfaces/Notification';
import moment from 'moment';

interface IProps {
  notificationItem: INotificationProps;
}

const notificationType = {
  NEW_EVENT_SCHEDULE_INVITATION: 'NEW_EVENT_SCHEDULE_INVITATION',
  NEW_TASK_INVITATION: 'NEW_TASK_INVITATION',
  EVENT_INVITATION_ANSWER: 'EVENT_INVITATION_ANSWER',
  EVENT_QUIT: 'EVENT_QUIT',
  EVENT_CANCELED: 'EVENT_CANCELED',
  EVENT_UPDATE: 'EVENT_UPDATE',
  TASK_INVITE_STATUS: 'TASK_INVITE_STATUS',
  TASK_STATUS_UPDATE: 'TASK_STATUS_UPDATE',
  UPCOMING_EVENT: 'UPCOMING_EVENT',
  ADDED_SCHEDULE: 'ADDED_SCHEDULE',
  NEW_EVENT: 'NEW_EVENT',
  TASK_UPDATE: 'TASK_UPDATE',
  TASK_REOPENED: 'TASK_REOPENED',
  TASK_LATE_OWNER: 'TASK_LATE_OWNER',
  TASK_LATE: 'TASK_LATE',
  TASK_SUPERVISOR: 'TASK_SUPERVISOR',
};

// @ts-ignore
const ScheduleToastNotificationFactory: React.FC<React.PropsWithChildren<IProps>> = ({ notificationItem }) => {
  // @ts-ignore
  const [notification] = useState(notificationItem);

  function returnAlertTime(alertValue: string) {
    switch (alertValue) {
      case 'FIFTEEN_MINUTES':
        return '15 minutos';
      case 'THIRTY_MINUTES':
        return '30 minutos';
      case 'ONE_HOUR':
        return '1 hora';
      case 'TWO_HOURS':
        return '2 horas';
      case 'ONE_DAY':
        return '1 dia';
      case 'ONE_WEEK':
        return '1 semana';
      default:
        return '';
    }
  }

  const renderActions = () => {
    // Used on type: EVENT_UPDATE
    function returnEventUpdate(type: 'date' | 'local' | 'hour' | 'other') {
      if (type === 'date') {
        return (
          <>
            a data do evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight> de{' '}
            <NotificationHighlight>{moment(notification.common.from).format('DD/MM/YYYY')}</NotificationHighlight> para{' '}
            <NotificationHighlight>{moment(notification.common.to).format('DD/MM/YYYY')}</NotificationHighlight>.
          </>
        );
      } else if (type === 'local') {
        return (
          <>
            o local do evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight> de{' '}
            <NotificationHighlight>{notification.common.from}</NotificationHighlight> para{' '}
            <NotificationHighlight>{notification.common.to}</NotificationHighlight>.
          </>
        );
      } else if (type === 'hour') {
        return (
          <>
            o horário do evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight> de{' '}
            <NotificationHighlight>{moment(notification.common.from).format('DD/MM/YYYY')}</NotificationHighlight> às{' '}
            <NotificationHighlight>{moment(notification.common.from).format('HH:mm')}</NotificationHighlight> para as{' '}
            <NotificationHighlight>{moment(notification.common.to).format('HH:mm')}</NotificationHighlight>.
          </>
        );
      } else if (type === 'other') {
        return (
          <>
            o evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight>
          </>
        );
      } else {
        return <></>;
      }
    }

    function returnTaskUpdate(status: string) {
      // Used on type: TASK_STATUS_UPDATE
      if (status === 'em andamento') {
        return <NotificationHighlight sx={{ color: '#0093bb' }}>em andamento</NotificationHighlight>;
      } else if (status === 'feito') {
        return <NotificationHighlight sx={{ color: '#00A424' }}>concluída</NotificationHighlight>;
      } else if (status === 'cancelada') {
        return <NotificationHighlight sx={{ color: '#df4c4c' }}>cancelada</NotificationHighlight>;
      } else if (status === 'em aberto') {
        return <NotificationHighlight sx={{ color: '#F3B516' }}>aberta</NotificationHighlight>;
      } else if (status === 'atrasada') {
        return <NotificationHighlight sx={{ color: '#df4c4c' }}>atrasada</NotificationHighlight>;
      }
    }

    switch (notificationItem.type) {
      case notificationType.NEW_EVENT_SCHEDULE_INVITATION:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> convidou você para{' '}
              <NotificationHighlight>{notification.common.event_name}</NotificationHighlight> que acontecerá no dia{' '}
              <NotificationHighlight>{moment(notification.common.date).format('DD/MM/YYYY')}</NotificationHighlight>
              {!notification.common.whole_day && (
                <>
                  , às <NotificationHighlight>{moment(notification.common.date).format('HH:mm')}</NotificationHighlight>
                </>
              )}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_TASK_INVITATION:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight sx={{ textTransform: 'capitalize' }}>
                {notification.sender.name}
              </NotificationHighlight>{' '}
              delegou a tarefa <NotificationHighlight>"{notification.common.task_title}"</NotificationHighlight>{' '}
              {notificationItem.common.date_hour ? (
                <>
                  com vencimento{' '}
                  <NotificationHighlight>
                    {moment(notificationItem.common.date_hour).format('DD/MM/YYYY')}
                  </NotificationHighlight>{' '}
                  às{' '}
                  <NotificationHighlight>
                    {moment(notificationItem.common.date_hour).format('HH:mm')}
                  </NotificationHighlight>
                </>
              ) : (
                'para você'
              )}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVENT_INVITATION_ANSWER:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight>{' '}
              <NotificationHighlight
                sx={{
                  color: notification.common.accepted === true ? '#00A424' : '#F61313',
                }}
              >
                {notification.common.accepted === true ? 'aceitou' : 'recusou'}
              </NotificationHighlight>{' '}
              seu convite para o evento <NotificationHighlight>{notification.common.event_name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVENT_QUIT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> saiu do evento{' '}
              <NotificationHighlight>{notification.common.event_name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVENT_CANCELED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> cancelou o evento{' '}
              <NotificationHighlight>{notification.common.event_name}</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVENT_UPDATE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> alterou{' '}
              {returnEventUpdate(notification.common.data_updated)}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.UPCOMING_EVENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              O evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight> acontecerá em{' '}
              <NotificationHighlight>{returnAlertTime(notification.common.event_deadline)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.TASK_INVITE_STATUS:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight>{' '}
              {notificationItem.common.task_invite_status === 'accepted' && (
                <label style={{ color: '#00A424' }}>aceitou</label>
              )}
              {notificationItem.common.task_invite_status === 'refused' && (
                <label style={{ color: '#F61313' }}>recusou</label>
              )}{' '}
              a tarefa
              <NotificationHighlight> "{notification.common.task_title}" </NotificationHighlight>
              delegada por você
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.TASK_STATUS_UPDATE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> alterou o status da tarefa para{' '}
              <NotificationHighlight>{returnTaskUpdate(notification.common.task_status)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.ADDED_SCHEDULE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> te adicionou na agenda{' '}
              <NotificationHighlight>"{notification.common.schedule_name}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_EVENT:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> adicionou um evento na agenda
              compartilhada <NotificationHighlight>{notification.common.schedule_name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.TASK_UPDATE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> alterou a tarefa{' '}
              <NotificationHighlight>{notification.common.task_title}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.TASK_REOPENED:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> reabriu a tarefa{' '}
              <NotificationHighlight>{notification.common.task_title}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.TASK_LATE_OWNER:
        return (
          <NotificationContainer>
            <NotificationContentText>
              A tarefa <NotificationHighlight>{notification.common.task_title}</NotificationHighlight> delegada para{' '}
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> está com status{' '}
              {returnTaskUpdate('atrasada')}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.TASK_LATE:
        return (
          <NotificationContainer>
            <NotificationContentText>
              A tarefa <NotificationHighlight>{notification.common.task_title}</NotificationHighlight> delegada por{' '}
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> está com status{' '}
              {returnTaskUpdate('atrasada')}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.TASK_SUPERVISOR:
        return (
          <NotificationContainer>
            <NotificationContentText>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> te adicionou como supervisor da
              tarefa
            </NotificationContentText>
          </NotificationContainer>
        );

      default:
        return <></>;
    }
  };

  useEffect(() => {
    renderActions();
  }, [notification]); // eslint-disable-line

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default ScheduleToastNotificationFactory;
