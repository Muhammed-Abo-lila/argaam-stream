import { channels } from "./channelsData";
import { episodesData } from "./episodesData";
export const getEpisodesByChannelId=(channelId)=>episodesData?.filter((episode)=>episode.channelId === channelId)
export const getChannelByChannelId=(channelId)=>channels?.find((channel)=>channel.id === channelId)
export const getEpisodesSortedByViews = () => [...episodesData].sort((a, b) => b.views - a.views)
export const getLatestEpisodes = () =>[...episodesData].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
