// Type definitions for fetch-github-release 0.3
// Definitions by: Borek Bernard <https://github.com/borekb>

/** 
 * Download a specific github release
 * @param user The name of the github user or organization
 * @param repo The name of the github repository
 * @param outputDir The directory to write the release to
 * @param filterRelease Optionally filter the release
 * @param filterAsset Optionally filter the asset for a given release
 * @param leaveZipped Optionally leave the file zipped
 * @param leaveZipped Optionally disable logging for quiet output
*/
declare function downloadRelease(
    user: string,
    repo: string,
    outputDir: string,
    filterRelease?: (release: downloadRelease.GithubRelease) => boolean,
    filterAsset?: (asset: downloadRelease.GithubReleaseAsset) => boolean,
    leaveZipped?: boolean,
    disableLogging?: boolean,
): Promise<string[]>;

declare namespace downloadRelease {
    /**
     * See https://developer.github.com/v3/repos/releases/#get-a-single-release-asset
    */
    export interface GithubRelease {
      id: number;
      url: string;
      tag_name: string;
      name: string;
      body: string;
      draft: boolean;
      prerelease: boolean;
      created_at: string;
      published_at: string;
    }

    /**
     * See https://developer.github.com/v3/repos/releases/#get-a-single-release-asset
     */
    export interface GithubReleaseAsset {
        id: number;
        name: string;
        url: string;
        content_type: string;
        size: number;
        created_at: string;
        updated_at: string;
    }
}

export = downloadRelease;
