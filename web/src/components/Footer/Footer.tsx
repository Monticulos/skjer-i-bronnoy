import { Paragraph } from '@digdir/designsystemet-react';
import { formatUpdatedAtDate } from '../../utils/formatDate';
import EventSubmissionDialog from '../EventSubmissionDialog/EventSubmissionDialog';
import styles from './Footer.module.css';

interface Props {
  updatedAt: string | null;
}

export default function Footer({ updatedAt }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {updatedAt && (
          <Paragraph data-size="sm" className={styles.updated}>
            Oppdatert {formatUpdatedAtDate(updatedAt)}
          </Paragraph>
        )}
        <EventSubmissionDialog />
      </div>
    </footer>
  );
}
