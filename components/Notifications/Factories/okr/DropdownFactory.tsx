import React, { useEffect } from 'react';

import { INotificationProps } from '@/safira-app/interfaces/Notification';
import { links } from '@/safira-app/config/links';

import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
} from '../_abstract/NotificationAbstract';

interface Props {
  notificationItem: INotificationProps;
}

const notificationType = {
  CYCLE_END: 'CYCLE_END',
  OBJECTIVE_END: 'OBJECTIVE_END',
  KEY_RESULT_END: 'KEY_RESULT_END',
  ADDED_ON_ACTION: 'ADDED_ON_ACTION',
  ADDED_ON_OBJECTIVE: 'ADDED_ON_OBJECTIVE',
  ADDED_ON_KEY_RESULT: 'ADDED_ON_KEY_RESULT',
  CYCLE_LATE: 'CYCLE_LATE',
  OBJECTIVE_LATE: 'OBJECTIVE_LATE',
  KEY_RESULT_LATE: 'KEY_RESULT_LATE',
  ACTION_LATE: 'ACTION_LATE',
  REMOVED_FROM_OBJECTIVE: 'REMOVED_FROM_OBJECTIVE',
  REMOVED_FROM_KEY_RESULT: 'REMOVED_FROM_KEY_RESULT',
  REMOVED_FROM_ACTION: 'REMOVED_FROM_ACTION',
};

const OKRDropdownNotificationFactory: React.FC<Props> = ({ notificationItem }) => {
  const { common } = notificationItem;

  function renderActions() {
    switch (notificationItem.type) {
      case notificationType.CYCLE_END:
        return (
          <NotificationContainer url={`${links.web.okr}/cycle/${common?.cycle_id}`} notification={notificationItem}>
            <NotificationContentText notification={notificationItem}>
              Você chegou ao final do ciclo{' '}
              <NotificationHighlight>"{notificationItem.common.title}"</NotificationHighlight>. Informe o resultado.
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.OBJECTIVE_END:
        return (
          <NotificationContainer
            url={`${links.web.okr}/cycle/${common?.cycle_id}/?obj_modal=1&id=${notificationItem.common.objective_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              Você chegou ao final do objetivo{' '}
              <NotificationHighlight>"{notificationItem.common.title}"</NotificationHighlight>. Informe o resultado.
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.KEY_RESULT_END:
        return (
          <NotificationContainer
            url={`${links.web.okr}/cycle/${common?.cycle_id}/?keyres_modal=1&obj_id=${notificationItem.common.objective_id}&id=${notificationItem.common.key_result_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              Você chegou ao final do resultado-chave{' '}
              <NotificationHighlight>"{notificationItem.common.title}"</NotificationHighlight>. Informe o resultado.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.ADDED_ON_OBJECTIVE:
        return (
          <NotificationContainer
            url={`${links.web.okr}/cycle/${common?.cycle_id}?obj_modal=1&id=${common?.objective_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              Você foi adicionado(a) no objetivo <NotificationHighlight>"{common?.title}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.ADDED_ON_KEY_RESULT:
        return (
          <NotificationContainer
            url={`${links.web.okr}/cycle/${common?.cycle_id}?keyres_modal=1&obj_id=${common?.objective_id}&id=${common?.key_result_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              Você foi adicionado(a) no resultado-chave <NotificationHighlight>"{common?.title}"</NotificationHighlight>
              .
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.ADDED_ON_ACTION:
        return (
          <NotificationContainer
            url={`${links.web.okr}/cycle/${common?.cycle_id}?action_modal=1&keyres_id=${common?.key_result_id}&id=${common?.action_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              Você foi adicionado(a) na ação <NotificationHighlight>"{common?.title}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.CYCLE_LATE:
        return (
          <NotificationContainer url={`${links.web.okr}/cycle/${common?.cycle_id}`} notification={notificationItem}>
            <NotificationContentText notification={notificationItem}>
              O ciclo <NotificationHighlight>"{common?.title}"</NotificationHighlight> está atrasado.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.OBJECTIVE_LATE:
        return (
          <NotificationContainer
            url={`${links.web.okr}/cycle/${common?.cycle_id}?obj_modal=1&id=${common?.objective_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              O objetivo <NotificationHighlight>"{common?.title}"</NotificationHighlight> está atrasado.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.KEY_RESULT_LATE:
        return (
          <NotificationContainer
            url={`${links.web.okr}/cycle/${common?.cycle_id}?keyres_modal=1&obj_id=${common?.objective_id}&id=${common?.key_result_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              O resultado-chave <NotificationHighlight>"{common?.title}"</NotificationHighlight> está atrasado.
            </NotificationContentText>
          </NotificationContainer>
        );
      case notificationType.ACTION_LATE:
        return (
          <NotificationContainer
            url={`${links.web.okr}/cycle/${common?.cycle_id}?action_modal=1&keyres_id=${common?.key_result_id}&id=${common?.action_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notificationItem}>
              A ação <NotificationHighlight>"{common?.title}"</NotificationHighlight> está atrasada.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.REMOVED_FROM_OBJECTIVE:
        return (
          <NotificationContainer url={`${links.web.okr}`} notification={notificationItem}>
            <NotificationContentText notification={notificationItem}>
              Você foi removido(a) do objetivo <NotificationHighlight>"{common?.title}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.REMOVED_FROM_KEY_RESULT:
        return (
          <NotificationContainer url={`${links.web.okr}`} notification={notificationItem}>
            <NotificationContentText notification={notificationItem}>
              Você foi removido(a) do resultado-chave <NotificationHighlight>"{common?.title}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.REMOVED_FROM_ACTION:
        return (
          <NotificationContainer url={`${links.web.okr}`} notification={notificationItem}>
            <NotificationContentText notification={notificationItem}>
              Você foi removido(a) da ação <NotificationHighlight>"{common?.title}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      default:
        return <></>;
    }
  }

  useEffect(() => {
    renderActions();
  }, [notificationItem]); // eslint-disable-line

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default OKRDropdownNotificationFactory;
