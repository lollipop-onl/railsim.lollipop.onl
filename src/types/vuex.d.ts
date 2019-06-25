import { Store as AuthStore } from '@/store/auth';
import { Store as PluginStore } from '@/store/plugin';
import { Store as UserStore } from '@/store/user';

export type RootStore = AuthStore & PluginStore & UserStore;
