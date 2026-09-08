import { supabase } from "../../supabaseClient";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DetalleRestaurante({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: restaurante, error } = await supabase
    .from("restaurantes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !restaurante) {
    notFound();
  }

  const linkWhatsapp = restaurante.whatsapp
    ? `https://wa.me/${restaurante.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Link
        href="/"
        className="text-sm text-emerald-600 hover:underline"
      >
        ← Volver a la lista
      </Link>

      <h1 className="mb-2 mt-4 text-2xl font-bold">
        {restaurante.nombre}
      </h1>

      <p className="mb-6 text-sm text-zinc-500">
        {restaurante.tipo_comida} · {restaurante.zona} ·{" "}
        {restaurante.rango_precio}
      </p>

      {restaurante.descripcion && (
        <p className="mb-6 text-zinc-700">
          {restaurante.descripcion}
        </p>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold">Horario</p>
          <p className="text-zinc-500">
            {restaurante.horario ?? "No disponible"}
          </p>
        </div>

        <div>
          <p className="font-semibold">Vestimenta</p>
          <p className="text-zinc-500">
            {restaurante.codigo_vestimenta ?? "No especificado"}
          </p>
        </div>
      </div>

      {linkWhatsapp && (
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Reservar por WhatsApp
        </a>
      )}
    </main>
  );
}