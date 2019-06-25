import { Store as UserStore } from '@/store/user';
import { Store as PluginStore } from '@/store/plugin';

export type RootStore = UserStore & PluginStore;
