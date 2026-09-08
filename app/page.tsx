import { supabase } from "./supabaseClient";
import ListaRestaurantes from "./ListaRestaurantes";

export default async function Home() {
  const { data: restaurantes, error } = await supabase
    .from("restaurantes")
    .select("*");

  if (error) {
    return <p>Error cargando restaurantes: {error.message}</p>;
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Restaurantes en Barranquilla
      </h1>

      <ListaRestaurantes restaurantes={restaurantes ?? []} />
    </main>
  );
}