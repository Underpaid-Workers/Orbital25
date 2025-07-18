import supabase from "@/supabase/main";

export default function fetchImage(bucket: string, image_url: string): string {
  return supabase.storage.from(bucket).getPublicUrl(image_url).data.publicUrl;
}
