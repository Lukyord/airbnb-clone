import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import TripClient from "./components/TripClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

export default async function TripPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserve any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
}
