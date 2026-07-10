# TrinityDev — Total Rebuild: "Editorial Ink & Paper"

Design spec — disetujui user 2026-07-10 (via plan approval). Menggantikan arah "Futuristic Luxe" (spec 2026-05-14).

## Context

TrinityDev adalah company profile untuk bisnis jasa pembuatan website milik founder (studio tunggal, Jakarta). Situs saat ini ("Futuristic Luxe": dark, glassmorphism, glow, Framer Motion) dianggap belum mencapai level yang diinginkan. Tujuan rebuild: **rombak total** — konsep, UI/UX, brand identity, tipografi, warna, layout, dan animasi — dengan target kualitas **setara/mendekati awwwards**.

Keputusan hasil brainstorming (disetujui user):

| Keputusan | Pilihan |
|---|---|
| Target pasar | Internasional + lokal; konten bahasa Inggris; positioning "studio digital kelas dunia dari Indonesia" |
| Brand | Nama **TrinityDev** tetap; identitas visual baru total |
| Estetika | **Editorial type-driven** (tipografi raksasa, grid editorial, motion presisi — tanpa WebGL) |
| Warna | **Ink & Paper dua dunia** — transisi gelap↔terang antar section saat scroll |
| Struktur | 4 halaman: Home · Work (+detail) · Studio · Contact. Blog dihapus |
| Motion | **Full experience**: preloader counter, curtain page transition, custom cursor, magnetic button, SplitText reveals, parallax, marquee — semua hormati `prefers-reduced-motion` |
| Konten Work | Proyek fiktif ditulis ulang sebagai **concept work berlabel jujur** |
| Tim | **Founder-led studio** (tanpa profil tim fiktif); testimoni fiktif dihapus |
| Teknis | Clean-slate UI di repo ini; stack dipertahankan; **Framer Motion dilepas**, GSAP + Lenis jadi satu-satunya sistem motion |

## Brand Identity (final)

- **Konsep**: "Trinity" = tiga → tiga pilar `01 Strategy / 02 Design / 03 Engineering`; motif penomoran editorial `(01)`, glyph `△` sebagai aksen mikro.
- **Warna**: Ink `#111110` (hitam hangat) · Paper `#F2EFE9` (putih tulang) · Aksen **Vermilion `#E8390E`** (dipakai hemat: hover, marker, kata kunci). Body text selalu ink-on-paper / paper-on-ink; vermilion hanya untuk display besar & elemen UI (jaga AA).
- **Tipografi** (semua self-host via `next/font/local`):
  - Display: **Clash Display** (Fontshare) — headline raksasa, tracking rapat
  - Body: **General Sans** (Fontshare)
  - Aksen: **Instrument Serif** italic — 1–2 kata kontras dalam headline
  - Meta/label: **JetBrains Mono** — uppercase kecil, metadata editorial
- **Voice**: Inggris, kalimat pendek & percaya diri. Metadata editorial: `JAKARTA, ID — 6.2°S 106.8°E`, `EST. 2026`, jam lokal real-time.
- **Wordmark**: "TrinityDev" tipografis murni + penanda kecil `— digital studio`. Tanpa ikon.

## Halaman

### `/` Home (perjalanan ink → paper → ink)
1. **Hero (ink)** — statement 3 baris raksasa, reveal per-baris, satu kata Instrument Serif italic; metadata sudut (lokasi/tahun/scroll hint)
2. **Manifesto (ink→paper)** — paragraf tebal, word-by-word scrub mengikuti scroll; background ber-tween ke paper
3. **Selected Work (paper)** — baris editorial: `(01)` + judul besar + kategori + tahun; preview image mengikuti cursor saat hover; badge `CONCEPT`
4. **Capabilities (paper)** — 3 pilar expandable rows dengan detail layanan
5. **Marquee (paper→ink)** — `LET'S BUILD SOMETHING RARE —` loop
6. **CTA + Footer (ink)** — kontak besar, wordmark raksasa terpotong, jam Jakarta live

### `/work` + `/work/[slug]`
- Indeks: list editorial besar (bukan grid kartu). Tanpa filter — dengan hanya 4 proyek, filter adalah noise; tambahkan nanti bila katalog tumbuh
- Case study: hero full-bleed, tabel meta mono (Role / Stack / Year / **Status: Concept**), narasi + gambar, "Next project" besar di akhir

### `/studio`
About + 3 pilar detail + prinsip kerja + **founder-led** ("small studio, senior craft, jaringan kolaborator") — tanpa profil fiktif

### `/contact`
Email raksasa `hello@trinitydev.io` (klik/copy), tombol WhatsApp (`wa.me/6289615219160`), form minimal yang **membuka WhatsApp dengan pesan ter-prefill** (bukan fake submit)

### Lain-lain
- `not-found.tsx` didesain ulang gaya editorial
- Redirect di `next.config`: `/services` & `/team` → `/studio`, `/blog*` → `/`

## Sistem Motion (GSAP 3.13+ / ScrollTrigger / SplitText / Lenis)

- **Lenis** global (provider), sinkron dengan ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` + gsap ticker
- **Preloader**: counter 0–100 + wordmark, curtain lift; hanya kunjungan pertama per sesi (`sessionStorage`)
- **Page transition**: curtain wipe panel ink saat pindah route
- **Teks**: SplitText line-mask reveal; manifesto word-scrub
- **Gambar**: clip-reveal + scale 1.15→1; parallax scrub halus
- **Hover**: magnetic button, underline slide, image follower di list Work
- **Cursor**: dot custom dengan state (`VIEW`/`OPEN`); nonaktif di touch
- **Dunia warna**: `background-color` body ber-tween ink↔paper per section boundary
- **Easing/durasi**: satu set konstanta di `src/lib/motion/` (mis. `expo.out`, durasi 0.8–1.2s) agar seluruh situs "berbahasa" sama
- **`prefers-reduced-motion` = kill switch global**: tanpa Lenis/preloader-counter/parallax/scrub/cursor; konten fade sederhana; marquee statis

## Arsitektur Kode (semua UI ditulis dari nol)

```
src/
├── app/
│   ├── layout.tsx          # font loading baru, providers, metadata baru
│   ├── page.tsx            # Home
│   ├── globals.css         # token baru total (hapus glassmorphism/glow/glitch)
│   ├── not-found.tsx
│   ├── work/page.tsx  work/[slug]/page.tsx
│   ├── studio/page.tsx     # BARU
│   └── contact/page.tsx
├── components/
│   ├── global/    # Nav, MenuOverlay, Footer, Preloader, PageTransition, SmoothScroll, Cursor
│   ├── home/      # Hero, Manifesto, SelectedWork, Capabilities, MarqueeBridge, CTA
│   ├── work/  studio/  contact/
│   └── ui/        # Button, LinkUnderline, Marquee, Reveal, SectionMeta
├── data/          # projects.ts (status:"concept"), capabilities.ts, studio.ts, navigation.ts
│                  # HAPUS: testimonials.ts, blog.ts, team.ts, services.ts (dilebur ke capabilities)
├── hooks/         # pertahankan yang masih relevan (useInView dll bila terpakai)
└── lib/
    ├── motion/    # gsap setup, konstanta easing, util reduced-motion, reveal helpers
    └── cn.ts
```

**Dihapus**: dependency `framer-motion`, folder `src/app/blog/`, `services/page.tsx`, `team/page.tsx`, komponen `sections/*` lama, util CSS lama. **Font**: Clash Display + General Sans di-download dari Fontshare → `src/fonts/`, load via `next/font/local`; Instrument Serif + JetBrains Mono via `next/font/google` (self-host otomatis oleh Next). **Gambar**: tetap Unsplash untuk concept work (sudah dikonfigurasi di next.config).

## Standar Kualitas

- WCAG AA di kedua dunia warna; focus ring terlihat di semua interaktif (situs lama pakai `focus:outline-none` — jangan diulang)
- Keyboard: menu overlay bisa dibuka/tutup (Escape), semua link/tombol reachable
- Lighthouse target: Performance ≥ 90 (mobile), Accessibility ≥ 95; LCP < 2.5s; CLS ≈ 0
- Animasi hanya `transform`/`opacity`; `will-change` disiplin
- SEO: metadata + OG image sesuai brand baru

## Verifikasi

1. `npm run build` + `npm run lint` bersih
2. Jalankan dev server, walkthrough semua route: preloader → home scroll penuh (cek transisi ink↔paper) → work → case study → studio → contact → 404 → redirect route lama
3. Emulasi `prefers-reduced-motion` di DevTools: pastikan situs tetap berfungsi penuh tanpa motion
4. Viewport mobile (375px) & desktop: tidak ada horizontal scroll, cursor custom nonaktif di touch
5. Cek kontras aksen vermilion di atas ink & paper (DevTools contrast checker)
