dat <- read.csv('testimonials-pilot.csv')
summary(dat)
dat <- subset(dat,indexical != 'catch')
plot(dat$hesitation, dat$proficiency)
plot(dat$indexical, dat$proficiency)
library(ggplot2)
library(dplyr)

p <- ggplot(dat, aes(x=indexical, y=proficiency)) +
  geom_boxplot(position = "dodge") +
  facet_grid(. ~ hesitation)
p
#range in hesitation could be due to noise-- weaker effects
p2 <- ggplot(dat, aes(x=indexical, y=relatability)) +
  geom_boxplot(position = "dodge") +
  facet_grid(. ~ hesitation)
p2
#connected and flip interaction w indexical and hesitation
p3 <- ggplot(dat, aes(x=indexical, y= believability)) +
  geom_boxplot(position = "dodge") +
  facet_grid(. ~ hesitation)
p3

sum <- dat %>%
  group_by(indexical, hesitation, yesno) %>%
  summarise(count=n()) %>%
  mutate(perc=count/sum(count), n=sum(count))

p4 <- ggplot(sum, aes(x=indexical, y=perc*100)) +
  geom_bar(position = "dodge") +
  facet_grid(. ~ hesitation)
p4
#look up how to plot three things
plot(dat$indexical, dat$yesno)
plot(dat$hesitation, dat$yesno)

#may not trust the interpreter so doesnt care about indexical
dat_h <- subset(dat,hesitation == 'HES')
plot(dat_h$indexical, dat_h$yesno)
#inclufenced by 2nd or 1st person, if trusted, affects judgement
dat_n <- subset(dat,hesitation == 'NOH')
plot(dat_n$indexical, dat_n$yesno)
