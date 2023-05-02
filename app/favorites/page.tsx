import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoriteClient from "./components/FavoriteClient";

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
}
