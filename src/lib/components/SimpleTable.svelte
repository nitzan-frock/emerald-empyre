<script lang="ts">
    interface TableColumn {
        header: string;
        key: string;
        cellType?: 'text' | 'link' | 'icon-link';
    }

    interface TableRow {
        [key: string]: string | { text?: string; url?: string } | undefined;
    }

    interface Props {
        columns: TableColumn[];
        rows: TableRow[];
    }

    let { columns, rows }: Props = $props();
</script>

<div class="overflow-x-auto">
    <table class="w-full border-collapse">
        <thead>
            <tr class="border-b border-emerald-600/50">
                {#each columns as column}
                    <th
                        class="text-center py-4 px-4 text-emerald-400 font-semibold"
                    >
                        {column.header}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each rows as row}
                <tr
                    class="border-b border-gray-700/50 hover:bg-emerald-950/20 transition-colors"
                >
                    {#each columns as column}
                        <td class="py-4 px-4 text-gray-300 text-center">
                            {#if typeof row[column.key] === "object" && row[column.key] !== null}
                                {@const cellValue = row[column.key] as {
                                    text?: string;
                                    url?: string;
                                }}
                                {#if cellValue.url && column.cellType === "icon-link"}
                                    <a
                                        href={cellValue.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="inline-flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors"
                                        aria-label="Get tickets"
                                    >
                                        <i class="bx bx-purchase-tag text-2xl"></i>
                                    </a>
                                {:else if cellValue.url}
                                    <a
                                        href={cellValue.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-emerald-400 hover:text-emerald-300 transition-colors underline"
                                    >
                                        {cellValue.text}
                                    </a>
                                {:else}
                                    {cellValue.text || ""}
                                {/if}
                            {:else}
                                {row[column.key] || ""}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
