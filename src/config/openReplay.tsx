import Tracker from '@openreplay/tracker';
import TrackerAssist from '@openreplay/tracker-assist';
import { IUser } from '@/interfaces/User';
import { links } from '@/utils/links';

export function initOpenReplayTracking(user: IUser | null) {
  const isProduction = Boolean(links.production);
  const sessionInfo = sessionStorage.getItem('openreplay-session');

  if (isProduction && user && !sessionInfo) {
    const tracker = new Tracker({
      projectKey: 'Jn5iTG5DsiZwMofN6xNO',
      ingestPoint: 'https://logging.incicle.com/ingest',
      obscureInputEmails: false,
      obscureTextEmails: false,
      defaultInputMode: 0,
      network: {
        captureInIframes: false,
        capturePayload: true,
        failuresOnly: false,
        ignoreHeaders: false,
        sessionTokenHeader: false,
      },
    });

    tracker.use(TrackerAssist({}));

    tracker.start({
      userID: user.email,
      metadata: {
        module: 'Safira Spa',
        profileID: user.profile_id,
        userType: user.type,
        username: user.username,
      },
    });

    localStorage.setItem('openreplay-session', 'created');
  }
}
