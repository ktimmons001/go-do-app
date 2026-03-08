import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const sb = createClient(url || "", key || "")

export async function load(k, fb) {
  try {
    const { data, error } = await sb.from("kv_store").select("value").eq("key", k).single()
    if (error || !data) return fb
    return JSON.parse(data.value)
  } catch { return fb }
}

export async function save(k, d) {
  try {
    await sb.from("kv_store").upsert({ key: k, value: JSON.stringify(d), updated_at: new Date().toISOString() }, { onConflict: "key" })
  } catch (e) { console.error(e) }
}
