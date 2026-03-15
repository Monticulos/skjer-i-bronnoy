import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventSubmissionDialog from './EventSubmissionDialog';

function getField(name: string) {
  return screen.getByRole('textbox', { name: new RegExp(name) });
}

async function openDialogAndFillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Tips om arrangement' }));
  await user.type(getField('Tittel'), 'Konsert');
  await user.type(getField('Beskrivelse'), 'En fin konsert');
  await user.type(getField('Tidspunkt'), '15.03.2026 kl 19:00');
  await user.type(getField('Sted'), 'Kulturhuset');
}

describe('EventSubmissionDialog', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders trigger button', () => {
    render(<EventSubmissionDialog />);
    expect(
      screen.getByRole('button', { name: 'Tips om arrangement' }),
    ).toBeInTheDocument();
  });

  it('opens dialog on trigger click', async () => {
    const user = userEvent.setup();
    render(<EventSubmissionDialog />);

    await user.click(screen.getByRole('button', { name: 'Tips om arrangement' }));

    expect(screen.getByText('Send inn arrangement')).toBeInTheDocument();
  });

  it('renders all form fields in dialog', async () => {
    const user = userEvent.setup();
    render(<EventSubmissionDialog />);

    await user.click(screen.getByRole('button', { name: 'Tips om arrangement' }));

    expect(getField('Tittel')).toBeInTheDocument();
    expect(getField('Beskrivelse')).toBeInTheDocument();
    expect(getField('Tidspunkt')).toBeInTheDocument();
    expect(getField('Sted')).toBeInTheDocument();
    expect(getField('Lenke til mer informasjon')).toBeInTheDocument();
  });

  it('shows success alert and hides form fields after successful submission', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 200 }));
    const user = userEvent.setup();
    render(<EventSubmissionDialog />);

    await openDialogAndFillForm(user);
    await user.click(screen.getByRole('button', { name: 'Send inn' }));

    expect(await screen.findByText(/Arrangementet er sendt til godkjenning/)).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /Tittel/ })).not.toBeInTheDocument();
  });

  it('shows error alert after failed submission', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }));
    const user = userEvent.setup();
    render(<EventSubmissionDialog />);

    await openDialogAndFillForm(user);
    await user.click(screen.getByRole('button', { name: 'Send inn' }));

    expect(await screen.findByText(/Noe gikk galt/)).toBeInTheDocument();
  });

  it('shows error alert after network failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Network error'));
    const user = userEvent.setup();
    render(<EventSubmissionDialog />);

    await openDialogAndFillForm(user);
    await user.click(screen.getByRole('button', { name: 'Send inn' }));

    expect(await screen.findByText(/Noe gikk galt/)).toBeInTheDocument();
  });
});
