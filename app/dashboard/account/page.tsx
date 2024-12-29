import { Metadata } from "next";
import { state } from "@/lib/db/state";

import { Section } from "@/components/layout/section";
import { colUser } from "@/components/layout/column";
import { GetCurrentPage, path } from "@/components/content";
import { AccountDataTable } from "@/components/layout/data-table";

export const metadata: Metadata = {
  title: GetCurrentPage(path.createAccount, true),
};

export default async function Page() {
  const data = await state.user.selectAll.execute();
  return (
    <Section currentPage={GetCurrentPage(path.createAccount)}>
      <AccountDataTable data={data} columns={colUser} />
    </Section>
  );
}
