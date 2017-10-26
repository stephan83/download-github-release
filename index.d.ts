// Type definitions for download-github-release 0.3
// Definitions by: Borek Bernard <https://github.com/borekb>

declare function downloadRelease(
    user: string,
    repo: string,
    outputDir: string,
    filterRelease?: () => boolean,
    filterAsset?: (asset: downloadRelease.GithubRelease ) => boolean,
    leaveZipped?: boolean
): Promise<void>;

declare namespace downloadRelease {
    /**
     * See https://developer.github.com/v3/repos/releases/#get-a-single-release-asset
     */
    export interface GithubRelease {
        name: string;
        browser_download_url: string;
        content_type: string;
        size: number;
    }
}

export = downloadRelease;
