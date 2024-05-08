<template>
  <main>
    <PageWrapper>
      <PageTitle class="pageTitle--mobile">About</PageTitle>

      <div class="aboutContainer">
        <SectionTitle>
           House Listing Application with VueJS.
        </SectionTitle>

        <TextParagraph>
          Our web application offers a dynamic platform for browsing an extensive 
          list of houses available for sale. Users can effortlessly search and filter 
          properties based on key criteria such as price and size, tailoring the search 
          to fit their needs. The platform also enables homeowners and real estate agents 
          to add new listings and efficiently edit or remove existing ones. With robust features
           designed for ease of use, our website ensures a smooth and effective process for both 
           finding and managing property listings.
        </TextParagraph>
      </div>

      <div class="aboutContainer">
        <SectionTitle>
          Development
        </SectionTitle>

        <DetailsContainer>
          <img alt="Developer Avatar" class="avatarImg" src="@/assets/avatar.jpg" />

          <div class="infoContainer">
            <TextParagraph>By Petek Savas</TextParagraph>
            <DetailContainer>
              <HouseDetailsIcon alt="Github icon" src="/src/assets/GitHub.png"/>
              <a 
                  href="https://github.com/petekgithub" 
                  target="_blank"
                  class="aboutLink"
                >
                  Github
                </a>
            </DetailContainer>

            <DetailContainer>
              <HouseDetailsIcon alt="Linkedin icon" src="/src/assets/linkedin_white.png"/>
              <a 
                href="https://www.linkedin.com/in/petek-savas/" 
                target="_blank"
                class="aboutLink"
              >
                Linkedin
              </a>
            </DetailContainer>
          </div>
        </DetailsContainer>
      </div>

    </PageWrapper>
  </main>
</template>

<script setup>
  import PageWrapper from "@/components/atoms/PageWrapper/PageWrapper.vue";
  import PageTitle from "@/components/atoms/Typography/PageTitle.vue";
  import SectionTitle from "@/components/atoms/Typography/SectionTitle.vue";
  import TextParagraph from "@/components/atoms/Typography/TextParagraph.vue";
  import DetailsContainer from "@/components/atoms/DetailsContainer/DetailsContainer.vue";
  import DetailContainer from "@/components/atoms/DetailsContainer/DetailContainer.vue";
  import HouseDetailsIcon from '@/components/atoms/Icons/HouseDetailsIcon.vue';
</script>

<style scoped>
  .pageTitle--mobile {
    display: block;
    text-align: center;
  }

  .aboutContainer {
    display: flex;
    gap: 8px;
    flex-direction: column;
    margin: 24px 0;
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
  }

  .avatarImg {
    width: 100px;
    height: 100%;
    border-radius: 5px;
  }

  .logoImage {
    width: 100px;
  }

  .aboutLink {
    text-decoration: none;
    color: var(--text-hyperlink);
    font-size: var(--link);
  }

  @media screen and (min-width: 1024px) {
    .pageTitle--mobile {
      display: none;
    }

    .aboutContainer {
      gap: 16px;
      margin: 32px 0;
    }

    .logoImage {
      width: 175px;
    }

    .aboutLink {
      color: var(--text-hyperlink);
      font-size: var(--listing-information);
    }

    .avatarImg {
      width: 175px;

    }
  }
</style>
