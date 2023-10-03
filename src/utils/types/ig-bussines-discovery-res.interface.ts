export interface IGBussinesDiscoveryRes {
  business_discovery: BusinessDiscovery;
  id: string;
}

export interface BusinessDiscovery {
  id: string;
  username: string;
  name: string;
  profile_picture_url: string;
}
