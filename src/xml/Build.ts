export class Build {
    public level = 0;

    toString(): string {
        return `<Build level="${this.level}" targetVersion="3_0" mainSocketGroup="1" viewMode="ITEMS">
</Build>`;
    }
}
