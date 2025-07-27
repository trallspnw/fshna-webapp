import { getPayload } from "payload";
import configPromise from '@payload-config'
import { person } from "../../generated/prisma";
import { DEFAULT_LANGUAGE, Language } from "@/packages/common/src/types/language";
import { getLocalizedValue } from "@/packages/common/src/lib/translation";
import { renderEmailBlocks } from '@common/lib/emailBlockUtil'
import React from "react";
import { renderToHtml } from "./emailRenderer";

const payload = await getPayload({ config: configPromise })

export async function sendEmails(persons: person[], slug: string, params: Record<string, string>) {
  const email = await getEmailBySlug(slug)
  if (!email) throw new Error(`Email with slug "${slug}" not found.`)

  const blocks = email.blocks ?? []

  for (const person of persons) {
    const language = person.language as Language || DEFAULT_LANGUAGE
    const subject = getLocalizedValue(email.subject, language)

    const html = await renderToHtml(React.createElement(
      React.Fragment, null, renderEmailBlocks(blocks, language, params)))

    await payload.sendEmail({
      to: person.email,
      subject,
      html,
    })
  }
}

async function getEmailBySlug(slug: string) {
  const { docs } = await payload.find({
    collection: 'emails',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return docs?.[0] ?? null
}
