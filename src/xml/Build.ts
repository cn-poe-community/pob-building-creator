export class Build {
    level = 0;
    className = "None";
    ascendClassName = "None";

    toString(): string {
        return `<Build level="${this.level}" className="${this.className}" ascendClassName="${this.ascendClassName}" targetVersion="3_0" mainSocketGroup="1" viewMode="ITEMS">
</Build>`;
    }
}
