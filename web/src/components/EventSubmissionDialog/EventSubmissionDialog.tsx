import {
  Alert,
  Button,
  Dialog,
  Field,
  Heading,
  Label,
  Tag,
  Textarea,
  Textfield,
} from '@digdir/designsystemet-react';
import { PaperplaneIcon, PlusIcon } from '@navikt/aksel-icons';
import type { FormEvent } from 'react';
import { useEventSubmission } from '../../hooks/useEventSubmission';
import styles from './EventSubmissionDialog.module.css';

export default function EventSubmissionDialog() {
  const { status, submitEvent, resetStatus } = useEventSubmission();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await submitEvent(formData);
  }

  return (
    <Dialog.TriggerContext>
      <Dialog.Trigger asChild>
        <Button variant="secondary" data-size="sm" onClick={resetStatus}>
          <PlusIcon />Tips om arrangement
        </Button>
      </Dialog.Trigger>
      <Dialog>
        <Dialog.Block>
          <Heading data-size="xs">Send inn arrangement</Heading>
        </Dialog.Block>
        <Dialog.Block>
          {status === 'success' ? (
            <Alert data-color="success">
              Takk for tipset! Arrangementet er sendt til godkjenning.
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <Textfield label={<>Tittel <RequiredTag /></>} name="tittel" required />
              <Field>
                <Label htmlFor="beskrivelse">Beskrivelse <RequiredTag /></Label>
                <Textarea id="beskrivelse" name="beskrivelse" required rows={4} />
              </Field>
              <Textfield
                label={<>Tidspunkt <RequiredTag /></>}
                name="tidspunkt"
                required
                description="F.eks. 15.03.2026 kl 12:00"
              />
              <Textfield label={<>Sted <RequiredTag /></>} name="sted" required />
              <Textfield
                label={<>Lenke til mer informasjon <OptionalTag /></>}
                name="lenke"
              />
              <Web3FormsMetaFields />

              {status === 'error' && (
                <Alert data-color="danger">
                  Noe gikk galt. Prøv igjen senere.
                </Alert>
              )}

              <div className={styles.actions}>
                <Button type="submit" disabled={status === 'submitting'}>
                  <PaperplaneIcon />
                {status === 'submitting' ? 'Sender...' : 'Send inn'}
                </Button>
              </div>
            </form>
          )}
        </Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  );
}

function RequiredTag() {
  return <Tag data-color="warning" data-size="sm" className={styles.labelTag}>Må fylles ut</Tag>;
}

function OptionalTag() {
  return <Tag data-color="info" data-size="sm" className={styles.labelTag}>Valgfritt</Tag>;
}

function Web3FormsMetaFields() {
  return (
    <>
      <input type="hidden" name="from_name" value="BrøArr" />
      <input type="hidden" name="subject" value="Nytt arrangement til vurdering" />
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} autoComplete="off" />
    </>
  );
}
