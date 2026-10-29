declare module "react-insta-stories" {
  import * as React from "react";

  export interface Story {
    url: string;
    type?: "image" | "video";
    duration?: number;
    header?: {
      heading?: string;
      subheading?: string;
      profileImage?: string;
    };
    seeMore?: (
      showSeeMore: (show: boolean) => void,
      close: () => void,
    ) => React.ReactNode;
  }

  export interface ReactStoriesProps {
    stories: Story[];
    defaultInterval?: number;
    width?: number | string;
    height?: number | string;
    onAllStoriesEnd?: (lastStoryIndex: number, stories: Story[]) => void;
    onStoryEnd?: (storyIndex: number, stories: Story[]) => void;
    onStoryStart?: (storyIndex: number, stories: Story[]) => void;
    loop?: boolean;
    isPaused?: boolean;
    keyboardNavigation?: boolean;
  }

  const ReactStories: React.ComponentType<ReactStoriesProps>;

  export default ReactStories;
}

